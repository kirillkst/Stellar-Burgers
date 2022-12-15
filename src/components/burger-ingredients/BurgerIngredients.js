import { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { INGREDIENTS_TYPES } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../ingredient-category/IngredientCategory';

import styles from './b-ingredients.module.scss';


const BurgerIngredients = ({ ingredients }) => {	
	const [activeTab, setActiveTab] = useState(null);
	const componentsRef = useRef();
	const typeRefs = useRef([]);
	const ingredientCats = Object.values(INGREDIENTS_TYPES);
	
	const onTabClick = (value) => {		
		typeRefs.current[value].scrollIntoView({ behavior: 'smooth' });
	}	

	const data = useMemo(() => {
		const arr = {};
		ingredientCats.forEach(el => {
			arr[el.key] = ingredients.filter(item => item.type === el.key)
		});

		return arr;
	}, [ingredients, ingredientCats]);
	

	return (
		<section className={styles.wrap}>
			<h1 className="pb-5 text text_type_main-large">Соберите бургер</h1>
			<div className={styles.tabs}>
				{ingredientCats.map((type, index) => (
					<Tab
						value={type.key}
						key={index}
						active={type.key === activeTab}
						onClick={onTabClick}
					>
						{type.name}
					</Tab>
				))}
			</div>
			<div className={styles.components} ref={componentsRef}>				
				{ingredientCats.map((type, index) => {
					return (
						<IngredientCategory
							key={index}
							typeRefs={typeRefs}
							componentsRef={componentsRef}
							category={type}
							ingredients={data[type.key]}
							setActiveTab={setActiveTab}
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
