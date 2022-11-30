import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';

import Ingredient from '../ingredient/Ingredient';

import styles from './ingredient-category.module.scss';

const IngredientCategory = ({ category, ingredients, onClick }) => {
	return (
		<section id={category.key}>
			<h2 className="pt-10 pb-6 text text_type_main-medium">{category.name}</h2>
			<ul className={styles.list}>
				{ingredients.map(item => (
					<li key={item._id}>
						<Ingredient {...item} onClick={onClick}/>
					</li>
				))}
			</ul>
		</section>
	);
};

IngredientCategory.propTypes = {
	category: PropTypes.shape({
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};

export default IngredientCategory;
