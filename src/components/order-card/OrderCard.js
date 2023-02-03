import { useMemo } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../store';
import { ingredientsSelectors } from '../../store/ingredientsSlice';
import styles from './order-card.module.scss';

const OrderCard = ( {id, number, name, ingredients, status, createdAt} ) => {
	const allIngredients = useSelector(ingredientsSelectors.selectAll, shallowEqual);

	const composition = useMemo(() => {
		return ingredients.map(el => {
            return ( el ) ? allIngredients.find(item => item._id === el) : false;
        })
	}, [ingredients, allIngredients]);	

    const totalPrice = useMemo(() => (
        composition.reduce((a, b) => a + b.price, 0)
    ), [composition]);

	const statusDict = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Готов'
    }

	const countItems = (obj) => {
		var tempResult = {};
		for ( let element of obj )
			tempResult[element._id] = { 
				...element, 
				count: tempResult[element._id] ? tempResult[element._id].count + 1 : 1
			}     

		return Object.values(tempResult);
	}

	return (
		<div className={styles.wrap}>
			<div className={`${styles.center} text text_type_digits-default pb-10`}>#{number}</div>
			<div className="text text_type_main-medium pb-3">{name}</div>
			<div className="text text_type_main-default pb-15">{statusDict[status]}</div>
			<div className="text text_type_main-medium pb-6">Состав:</div>
			<ul className={styles.composition}>
				{countItems(composition).map((item) => {
					return (
						<li className={styles.ingredient} key={item._id}>
							<div className={styles.ingredientImage}><img src={item.image} alt={item.name}/></div>
							<div className={styles.ingredientName}>{item.name}</div>
							<div className={styles.price}>{item.count} x {item.price} <CurrencyIcon type="primary" /></div>	
						</li>
					);
				})}
			</ul>
            <div className={styles.meta}>
                <div className="text text_type_main-default text_color_inactive">
					<FormattedDate date={new Date(createdAt)} />
				</div>
                <div className={styles.price}>
                    {totalPrice}
                    <CurrencyIcon type="primary" />
                </div>
            </div>
		</div>
	);
};

export default OrderCard;
