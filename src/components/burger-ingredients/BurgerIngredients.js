import { useState, useRef} from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../ingredient-category/IngredientCategory';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from "../modals/Modal";

import { ingredientPropTypes, INGREDIENTS_TYPES } from '../../utils/constants';

import styles from './b-ingredients.module.scss';

const BurgerIngredients = ({ ingredients }) => {	
	const [ingredientModal, setIngredientModal] = useState(null);
	const [activeTab, setActiveTab] = useState(0);
	const typeRefs = useRef([]);
	
	const handleOpenModal = (id) => {
		const ingredient = ingredients.find(el => el._id === id);
		setIngredientModal(ingredient);				
	};

	const onTabClick = (value) => {
		typeRefs.current[value].scrollIntoView({ behavior: 'smooth' });
		setActiveTab(Object.keys(typeRefs.current).findIndex(el => el === value));
	}	
	
	return (
		<section className={styles.wrap}>
			<h1 className="pb-5 text text_type_main-large">Соберите бургер</h1>
			<div className={styles.tabs}>
				{INGREDIENTS_TYPES.map((type, index) => (
					<Tab
						value={type.key}
						key={index}
						active={index === activeTab}
						onClick={onTabClick}
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
							innerRef={el => typeRefs.current[type.key] = el}
							category={type}
							ingredients={data}
							key={index}
							onClick={handleOpenModal}
						/>
					);
				})}
			</div>			
			{ingredientModal && (
				<Modal title="Детали ингредиента" onClose={() => setIngredientModal(null)}> 
					<IngredientDetails ingredient={ingredientModal} />
				</Modal>
			)}			
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};

export default BurgerIngredients;
