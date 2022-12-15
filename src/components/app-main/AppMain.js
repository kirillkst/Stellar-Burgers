import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ingredientsSelectors } from '../../store/ingredients/slice';
import { cartIngredientsSelectors } from '../../store/cart/slice';
import { INGREDIENTS_TYPES } from '../../utils/constants';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';


const AppMain = () => {	
	 const ingredients = useSelector(ingredientsSelectors.selectAll, shallowEqual);
	 const cartIngredients = useSelector(cartIngredientsSelectors.selectAll, shallowEqual);
	 const { bun, total } = useSelector(store => store.cart, shallowEqual);	 

	const ingredientSelected = useMemo(() => {
		return structuredClone(ingredients).map(el => {
			const counter = (el.type === INGREDIENTS_TYPES.BUN.key && bun?._id === el._id) 
				? 2
				: cartIngredients.filter(item => item._id === el._id).length;	

			if ( counter > 0 )
				el.counter = counter;
			else 
				delete el.counter;
	
			return el;
		})
	}, [bun, cartIngredients, ingredients]);	


    return (
        <DndProvider backend={HTML5Backend}>
			<BurgerIngredients ingredients={ingredientSelected} />  
            <BurgerConstructor bun={bun} ingredients={cartIngredients} total={total} />
        </DndProvider>    
    );
}


export default AppMain;
