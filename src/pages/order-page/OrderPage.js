import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBurgerApi from '../../hooks/useBurgerApi';
import OrderCard from "../../components/order-card/OrderCard";
import Spinner from "../../components/spinner/Spinner";
import { PROCESS_STATE } from "../../utils/constants";

const OrderPage = () => {
	const { number } = useParams();
    const [order, setOrder] = useState(null);
    
	const { process, setProcess, getOrder } = useBurgerApi();
    
    useEffect(() => {		
        getOrder(number)
			.then(res => {
                if (res.success === true) {					
                    setOrder(res.orders[0]);      	
				} else {					
  					throw new Error();
				}
			})
            .then(() => setProcess(PROCESS_STATE.CONFIRMED))
			.catch();	
	}, []);

    return ( process !== PROCESS_STATE.CONFIRMED ) ? <Spinner /> : <OrderCard {...order} />;
};

export default OrderPage;
