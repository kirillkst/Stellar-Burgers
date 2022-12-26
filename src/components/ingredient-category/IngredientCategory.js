import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

import { ingredientPropTypes } from '../../utils/prop-types';

import Ingredient from '../ingredient/Ingredient';

import styles from './ingredient-category.module.scss';

const IngredientCategory = ({ typeRefs, componentsRef, category, ingredients, setActiveTab }) => {	
	const { ref : inViewRef } = useInView({
		rootMargin: '0px 0px -90%',
		root: componentsRef.current,
		onChange: (inView, entry) => {
			if (inView)
				setActiveTab(category.key);
		  },
	});

	const setRefs = (el) => {
		  typeRefs.current[category.key] = el;
		  inViewRef(el);
	};

	return (
		<section id={category.key} ref={setRefs}>
			<h2 className="mt-10 mb-6 text text_type_main-medium">{category.name}</h2>
			<ul className={styles.list}>
				{ingredients.map(item => (
					<li key={item._id}>
						<Ingredient {...item} />
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
