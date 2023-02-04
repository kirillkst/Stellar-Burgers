import { useEffect, useState } from "react";
import { useDispatch, useSelector } from '../../store';
import { getCookie, deleteCookie } from "../../services/cookie";
import { WS_URL } from '../../utils/constants';
import { wsConnection, wsDisconnection } from '../../store/socketSlice';
import OrdersList from '../orders-list/OrdersList';
import Spinner from "../spinner/Spinner";
import { WebsocketStatus } from "../../utils/types";


const ProfileOrders = () => {    
    const dispatch = useDispatch();	
    const accessToken = getCookie('token');    
    const socketStatus = useSelector(store => store.websocket.status);
    const ordersInfo = useSelector(store => store.websocket.ordersInfo);

    useEffect(() => {
        dispatch(wsConnection({
            url: `${WS_URL}/orders?token=${accessToken}`
        }))

        return () => {          
            dispatch(wsDisconnection());
        }
    }, [dispatch, accessToken]);

    return (socketStatus === WebsocketStatus.OFFLINE) ? <Spinner /> : <OrdersList orders={ordersInfo.orders} />;
};

export default ProfileOrders;
