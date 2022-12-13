import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ingredientsSelectors } from '../../store/ingredients/slice';
import { CartContext } from '../../services/appContext';
import { INGREDIENTS_TYPES } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/prop-types';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';


const AppMain = () => {
	
	//const ingredients = useSelector(ingredientsSelectors.selectAll);

	const { cart } = useContext(CartContext);

	// const ingredientSelected = useMemo(() => {
	// 	return ingredients.map(el => {
	// 		const counter = (el.type === INGREDIENTS_TYPES.BUN.key && cart.bun?._id === el._id) 
	// 			? 1 
	// 			: cart.ingredients.filter(item => item._id === el._id).length;	
	
	// 		if ( counter > 0 )
	// 			el.counter = counter;
	// 		else 
	// 			delete el.counter;
	
	// 		return el;
	// 	})
	// }, [cart.bun, cart.ingredients, ingredients]);	
	const ingredientSelected = '';
    return (
        <>          
            <BurgerIngredients ingredients={ingredientSelected} />  
            <BurgerConstructor />
        </>
    );
}


export default AppMain;
