import { useSelector } from 'react-redux';

import { renderContent } from '../../utils/burger-utils';

import OrderDetailsView from '../order-details-view/OrderDetailsView';

import styles from './order-details.module.scss';


const OrderDetails = () => {    	
    const process = useSelector(store => store.order.process);
	const number = useSelector(store => store.order.number);	

    const content = renderContent(process, OrderDetailsView, { number });

    return (
        <div className={styles.wrap}>
            {content}
        </div>
    );
};


export default OrderDetails;
