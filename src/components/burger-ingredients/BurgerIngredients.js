import PropTypes from 'prop-types';
import { ingredientPropTypes, INGREDIENTS_TYPES } from '../../utils/constants';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../ingredient-category/IngredientCategory';

import styles from './b-ingredients.module.scss';

const BurgerIngredients = ({ ingredients }) => {
	return (
		<section className={styles.wrap}>
			<h1 className="pb-5 text text_type_main-large">Соберите бургер</h1>
			<div className={styles.tabs}>
				{INGREDIENTS_TYPES.map((type, index) => (
					<Tab
						value={type.key}
						key={index}
						active={index === 0}
					>
						{type.name}
					</Tab>
				))}
			</div>
			<div className={styles.components}>
				{INGREDIENTS_TYPES.map((type, index) => {
					const data = ingredients.filter(item => item.type === type.key);
                    
					return (
						<IngredientCategory
							category={type}
							ingredients={data}
							key={index}
						/>
					);
				})}
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};

export default BurgerIngredients;
