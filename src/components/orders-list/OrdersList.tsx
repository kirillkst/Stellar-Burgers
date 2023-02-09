import { TOrder } from "../../utils/types";
import OrderItem from "../order-item/OrderItem";
import styles from './orders-list.module.scss';

const OrdersList = ( {orders} : { orders: Array<TOrder> } ) => {
    return (
        <ul className={styles.wrap}>
            {orders.map((item: TOrder) => (
                 <li key={item._id}><OrderItem {...item} /></li>
            ))}
        </ul>
    );
};

export default OrdersList;
