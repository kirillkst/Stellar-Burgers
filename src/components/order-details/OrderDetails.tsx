import { useSelector } from '../../store';

import { PROCESS_STATE } from '../../utils/constants';
import ErrorMessage from '../errors/ErrorMessage';

import OrderDetailsView from '../order-details-view/OrderDetailsView';
import Spinner from '../spinner/Spinner';

import styles from './order-details.module.scss';


const OrderDetails = () => {    	
    const process = useSelector<typeof PROCESS_STATE[keyof typeof PROCESS_STATE]>(store => store.order.process);
	const number = useSelector<any>(store => store.order.number);	

    let content = <Spinner />;

    if (process === PROCESS_STATE.CONFIRMED) {
        content = <OrderDetailsView number={number} />;
    } else if (process === PROCESS_STATE.ERROR) {
        content = <ErrorMessage />;
    }

    return (
        <div className={styles.wrap}>
            {content}
        </div>
    );
};


export default OrderDetails;
