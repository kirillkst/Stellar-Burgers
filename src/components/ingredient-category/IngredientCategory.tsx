import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

import { ingredientPropTypes } from '../../utils/prop-types';

import Ingredient from '../ingredient/Ingredient';

import styles from './ingredient-category.module.scss';
import { TIngredientCategory } from '../../utils/types';

const IngredientCategory = ({ typeRefs, componentsRef, category, ingredients, setActiveTab } : TIngredientCategory) => {	
	const { ref : inViewRef } = useInView({
		rootMargin: '0px 0px -90%',
		root: componentsRef.current,
		onChange: (inView, entry) => {
			if (inView)
				setActiveTab(category.key);
		  },
	});

	const setRefs = (el:HTMLDivElement) => {
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

export default IngredientCategory;
