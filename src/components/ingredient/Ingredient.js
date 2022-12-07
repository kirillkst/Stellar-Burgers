import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.scss';

const Ingredient = ({ _id, name, price, image, counter, onIngredientClick }) => {
	return (
		<div className={styles.wrap} onClick={() => onIngredientClick(_id)}>
			<div className={styles.image}>
				<img src={image} alt=""/>
			</div>
			<div className={styles.price}>
				{price}
				<CurrencyIcon type="primary" />
			</div>
			<div className={styles.name}>{name}</div>
			{counter && (
				<Counter
					count={counter}
					size="default"
					extraClass="m-1"
				/>
			)}
		</div>
	);
};

Ingredient.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	counter: PropTypes.number
};

export default Ingredient;
