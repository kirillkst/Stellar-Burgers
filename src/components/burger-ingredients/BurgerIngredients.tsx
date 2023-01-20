import { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { INGREDIENTS_TYPES } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../ingredient-category/IngredientCategory';

import styles from './b-ingredients.module.scss';
import { TBurgerIngredients } from '../../utils/types';


const BurgerIngredients = ({ ingredients } : TBurgerIngredients) => {	
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const componentsRef = useRef<any>();
	const typeRefs = useRef<[] | HTMLElement | any>([]);
	const ingredientCats = Object.values(INGREDIENTS_TYPES);
	
	const onTabClick = (value:any) => {		
		typeRefs.current[value].scrollIntoView({ behavior: 'smooth' });
	}	

	const data = useMemo(() => {
		const arr = {} as any;
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

export default BurgerIngredients;
