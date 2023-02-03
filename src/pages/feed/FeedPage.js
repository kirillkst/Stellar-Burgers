import { useEffect, useState } from "react";
import OrdersList from "../../components/orders-list/OrdersList";
import Spinner from "../../components/spinner/Spinner";
import { useDispatch, useSelector } from "../../store";
import { wsConnection, wsDisconnection, wsOpen, wsClose } from "../../store/socketSlice";
import { WS_URL } from "../../utils/constants";
import { WebsocketStatus } from "../../utils/types";
import styles from './feed.module.scss';

const FeedPage = () => {
    const dispatch = useDispatch();
    const socketStatus = useSelector( store => store.websocket.status );
    const ordersInfo = useSelector( store => store.websocket.ordersInfo );

    useEffect(() => {
        dispatch(wsConnection({
            url: `${WS_URL}/all`
        }))

        return () => {          
            dispatch(wsDisconnection());
        }
    }, [dispatch])

    if ( socketStatus === WebsocketStatus.OFFLINE )
        return <Spinner />

    return (
        <>
            <OrdersList orders={ordersInfo.orders}/>
            <div className={styles.info}>
                <div className={styles.status}>
                    <div>
                        <p className="text text_type_main-medium pb-6">Готовы:</p>
                        <ul>
                            {ordersInfo.orders
                                .filter(item => item.status === 'done')
                                .slice(0, 10)
                                .map(item=> (
                                    <li className="text text_type_digits-default text_color_success pb-2" key={item.number}>{item.number}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <p className="text text_type_main-medium pb-6">В работе:</p>
                        <ul>
                            {ordersInfo.orders
                                .filter(item => item.status === 'pending')
                                .slice(0, 10)
                                .map(item=> (
                                    <li className="text text_type_digits-default pb-2" key={item.number}>{item.number}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large pb-15">{ordersInfo.totalOrders}</p>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{ordersInfo.totalToday}</p>
            </div>
        </>
    );
};

export default FeedPage;
