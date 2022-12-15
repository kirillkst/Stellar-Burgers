import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cartIngredientsSelectors } from '../../store/cartSlice';
import { createOrderRequest } from "../../store/orderSlice";
import { renderContent } from '../../utils/burger-utils';

import OrderDetailsView from '../order-details-view/OrderDetailsView';

import styles from './order-details.module.scss';


const OrderDetails = () => {    	
    const process = useSelector(store => store.order.process);
	const number = useSelector(store => store.order.number);	
	const bun = useSelector(store => store.cart.bun);
	const ingredients = useSelector(cartIngredientsSelectors.selectAll);

    const dispatch = useDispatch();	
    
	useEffect(() => {
        dispatch(createOrderRequest(
			[bun._id, ...ingredients.map(el => el._id)]
		));      
    }, []);

    const content = renderContent(process, OrderDetailsView, { number });

    return (
        <div className={styles.wrap}>
            {content}
        </div>
    );
};


export default OrderDetails;
