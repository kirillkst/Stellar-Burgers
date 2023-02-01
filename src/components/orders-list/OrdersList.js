import OrderItem from "../order-item/OrderItem";
import styles from './orders-list.module.scss';

const OrdersList = () => {
    return (
        <ul className={styles.wrap}>
            <li><OrderItem /></li>
            <li><OrderItem /></li>
            <li><OrderItem /></li>
            <li><OrderItem /></li>
            <li><OrderItem /></li>
        </ul>
    );
};

export default OrdersList;
