import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import store from "../../store";

import { changeCounter, ingredientsSelectors } from '../../store/ingredients/slice';
import { addToCart, removeFromCart, cartIngredientsSelectors } from '../../store/cart/slice';
import { CartContext } from '../../services/appContext';
import { INGREDIENTS_TYPES } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/prop-types';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';


const AppMain = () => {	
	 const ingredients = ingredientsSelectors.selectAll(store.getState());
	 const cartIngredients = cartIngredientsSelectors.selectAll(store.getState());
	 const { bun, total } = useSelector(store => store.cart, shallowEqual);


	 const dispatch = useDispatch();	

	const { cart } = useContext(CartContext);

	
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
