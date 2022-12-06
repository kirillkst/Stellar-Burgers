import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import useBurgerApi from '../../hooks/useBurgerApi';

import { CartContext } from '../../services/appContext';
import { renderContent } from '../../utils/burger-services';
import { PROCESS_STATE } from '../../utils/constants';

import donePng from '../../images/done.png';
import styles from './order-details.module.scss';

const OrderDetails = () => {    
    const { cart } = useContext(CartContext);
    const [number, setNumber] = useState(null);
	const { process, setProcess, createOrder } = useBurgerApi();

    const ingredientsID = [cart.bun._id, ...cart.ingredients.map(el => el._id)];

    useEffect(() => {		
        createOrder(ingredientsID)
			.then(res => {
				if (res.success === true) {
					setNumber(res.order.number);					
				} else {					
  					throw new Error();
				}
			})
			.then(() => setProcess(PROCESS_STATE.CONFIRMED));		
		
	}, []);

    const content = renderContent(process, View, { number });

    return (
        <div className={styles.wrap}>
            {content}
        </div>
    );
};

const View = ({ number }) => {
    return (
        <>
            <div className="pt-15 mb-8 text text_type_digits-large">{number}</div>
            <div className="text text_type_main-medium mb-15">идентификатор заказа</div>
            <img src={donePng} alt="" className="mb-15" />
            <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
            <div className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</div>       
        </>
    )
}

export default OrderDetails;
