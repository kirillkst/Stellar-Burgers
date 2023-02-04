import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBurgerApi from '../../hooks/useBurgerApi';
import OrderCard from "../../components/order-card/OrderCard";
import Spinner from "../../components/spinner/Spinner";
import { PROCESS_STATE } from "../../utils/constants";
import { TOrder } from "../../utils/types";

const OrderPage = () => {

	const { number }  = useParams<{number: string}>();
    const [order, setOrder] = useState<TOrder>();
    
	const { process, setProcess, getOrder } = useBurgerApi();
    
    useEffect(() => {		
        getOrder(number)
			.then((res: { success: boolean; orders: TOrder[] } & any) => {
                if (res.success === true) {					
                    setOrder(res.orders[0]);      	
				} else {					
  					throw new Error();
				}
			})
            .then(() => setProcess(PROCESS_STATE.CONFIRMED))
			.catch();	
	}, []);

	if (process === PROCESS_STATE.CONFIRMED && typeof order != 'undefined')
		return <OrderCard {...order} />
	else 
		return <Spinner />;
};

export default OrderPage;
