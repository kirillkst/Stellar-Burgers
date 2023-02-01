import OrdersList from "../../components/orders-list/OrdersList";
import styles from './feed.module.scss';

const FeedPage = () => {
    return (
        <>
            <OrdersList />
            <div className={styles.info}>
                <div className={styles.status}>
                    <div>
                        <p className="text text_type_main-medium pb-6">Готовы:</p>
                        <ul>
                            <li className="text text_type_digits-default text_color_success pb-2">034533</li>
                            <li className="text text_type_digits-default text_color_success pb-2">034533</li>
                            <li className="text text_type_digits-default text_color_success pb-2">034533</li>
                            <li className="text text_type_digits-default text_color_success pb-2">034533</li>
                            <li className="text text_type_digits-default text_color_success pb-2">034533</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text text_type_main-medium pb-6">В работе:</p>
                        <ul>
                            <li className="text text_type_digits-default pb-2">034533</li>
                            <li className="text text_type_digits-default pb-2">034533</li>
                            <li className="text text_type_digits-default pb-2">034533</li>
                            <li className="text text_type_digits-default pb-2">034533</li>
                            <li className="text text_type_digits-default pb-2">034533</li>
                        </ul>
                    </div>
                </div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large pb-15">28 752</p>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">138</p>
            </div>
        </>
    );
};

export default FeedPage;
