import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../store';
import { ingredientsSelectors } from '../../store/ingredientsSlice';
import styles from './order-card.module.scss';

const OrderCard = () => {
	const { number } = useParams();

	const ingredients = useSelector(ingredientsSelectors.selectAll, shallowEqual);

	const composition = ingredients.filter((item) =>
		[
			'60d3b41abdacab0026a733c6',
			'60d3b41abdacab0026a733c7',
			'60d3b41abdacab0026a733c8',
			'60d3b41abdacab0026a733cb',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733d2'
		].includes(item._id)
	);

	return (
		<div className={styles.wrap}>
			<div className={`${styles.center} text text_type_digits-default pb-10`}>#034535</div>
			<div className="text text_type_main-medium pb-3">Death Star Starship Main бургер</div>
			<div className="text text_type_main-default pb-15">Создан</div>
			<div className="text text_type_main-medium pb-6">Состав:</div>
			<ul className={styles.composition}>
				{composition.map((item) => {
					return (
						<li className={styles.ingredient} key={item._id}>
							<div className={styles.ingredientImage}><img src={item.image} alt={item.name}/></div>
							<div className={styles.ingredientName}>{item.name}</div>
							<div className={styles.price}>2 x 20 <CurrencyIcon type="primary" /></div>	
						</li>
					);
				})}
			</ul>
            <div className={styles.meta}>
                <div className="text text_type_main-default text_color_inactive">
					Сегодня, 16:20
				</div>
                <div className={styles.price}>
                    480
                    <CurrencyIcon type="primary" />
                </div>
            </div>
		</div>
	);
};

export default OrderCard;
