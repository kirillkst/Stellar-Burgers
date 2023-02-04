import { useMemo } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { shallowEqual } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../store";
import { ingredientsSelectors } from "../../store/ingredientsSlice";
import styles from './order-item.module.scss';
import { TIngredient, TOrder } from "../../utils/types";

const OrderItem = ( props: TOrder ) => {
    const {_id, number, name, ingredients, status, createdAt } = props;

    let location = useLocation();
    const { path, url } = useRouteMatch();
    const allIngredients = useSelector(ingredientsSelectors.selectAll, shallowEqual);

    const composition = useMemo(() => {
		return ingredients.map(el => {
			return allIngredients.find(item => item._id === el);
		}).filter(el => el !== null) as TIngredient[];
	}, [ingredients, allIngredients]);	

    const totalPrice = useMemo(() => (
        composition.reduce((a, b) => a + b.price, 0)
    ), [composition]);

    
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className="text text_type_digits-default">
                    #{number}
                </div>
				<div className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(createdAt)} />
				</div>
			</div>
			<div className="text text_type_main-medium pb-2">
                {name}
            </div>
			<div className="text text_type_main-default pb-6">
                {status === 'done' ? 'Готов' : 'В работе'}
            </div>
            <div className={styles.meta}>
                <ul className={styles.ingredients}>
                    {composition.map((item, index) => {    
                        if (index > 5)
                            return false;

                        const rest = composition.length - 6;
                        const zIndex = composition.length - index;
                        return (
                            <li style={{'zIndex': zIndex}} key={index}>
                                <img src={item?.image} alt={item?.name}/>
                                {index === 5 && rest > 0 && <span>+{rest}</span>}
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.price}>
                    {totalPrice}
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            <Link
				to={{
					pathname: `${path}/${number}`,
					state: { 
                        background: location, 
                        orderInfo: props
                    }
				}}
				className={styles.link}
			>
			</Link>
		</div>
	);
};

export default OrderItem;
