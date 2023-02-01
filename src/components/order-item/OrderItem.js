import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { shallowEqual } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../store";
import { ingredientsSelectors } from "../../store/ingredientsSlice";
import styles from './order-item.module.scss';

const OrderItem = () => {
    let location = useLocation();
    const { path, url } = useRouteMatch();
    const ingredients = useSelector(ingredientsSelectors.selectAll, shallowEqual);
    const composition = ingredients.filter(item => (
        [
            '60d3b41abdacab0026a733c6',
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733c8',
            '60d3b41abdacab0026a733cb',
        ].includes(item._id)
    ));
    
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className="text text_type_digits-default">
                    #034535
                </div>
				<div className="text text_type_main-default text_color_inactive">
					Сегодня, 16:20
				</div>
			</div>
			<div className="text text_type_main-medium pb-2">
                Death Star Starship Main бургер
            </div>
			<div className="text text_type_main-default pb-6">
                Создан
            </div>
            <div className={styles.meta}>
                <ul className={styles.ingredients}>
                    {composition.map((item, index) => {                        
                        let zIndex = composition.length - index;
                        return (
                            <li style={{'zIndex': zIndex}} key={item._id}><img src={item.image} alt={item.name}/></li>
                        )
                    })}
                </ul>
                <div className={styles.price}>
                    480
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <Link
				to={{
					pathname: `${path}/11`,
					state: { background: location }
				}}
				className={styles.link}
			>
			</Link>
		</div>
	);
};

export default OrderItem;
