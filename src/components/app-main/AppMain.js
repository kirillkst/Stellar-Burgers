import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import store from "../../store";
import { ingredientsSelectors } from '../../store/ingredients/slice';
import { cartIngredientsSelectors } from '../../store/cart/slice';
import { INGREDIENTS_TYPES } from '../../utils/constants';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';


const AppMain = () => {	
	 const ingredients = ingredientsSelectors.selectAll(store.getState());
	 const cartIngredients = cartIngredientsSelectors.selectAll(store.getState());
	 const { bun, total } = useSelector(store => store.cart, shallowEqual);

	const ingredientSelected = useMemo(() => {
		return structuredClone(ingredients).map(el => {
			const counter = (el.type === INGREDIENTS_TYPES.BUN.key && bun?._id === el._id) 
				? 1 
				: cartIngredients.filter(item => item._id === el._id).length;	

			if ( counter > 0 )
				el.counter = counter;
			else 
				delete el.counter;
	
			return el;
		})
	}, [bun, cartIngredients, ingredients]);	


    return (
        <>          
            <BurgerIngredients ingredients={ingredientSelected} />  
            <BurgerConstructor bun={bun} ingredients={cartIngredients} total={total} />
        </>
    );
}


export default AppMain;
