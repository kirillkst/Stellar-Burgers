import OrderItem from "../order-item/OrderItem";
import styles from './orders-list.module.scss';

const OrdersList = ( {orders} ) => {
    return (
        <ul className={styles.wrap}>
            {orders.map((item) => (
                 <li key={item._id}><OrderItem {...item} /></li>
            ))}
        </ul>
    );
};

export default OrdersList;
