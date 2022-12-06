import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

import { CartContext } from '../../services/appContext';
import { ingredientPropTypes } from '../../utils/constants';

const AppMain = ({ ingredients }) => {
	const { cart } = useContext(CartContext);

	const ingredientSelected = ingredients.map(el => {
		const counter = (el.type === 'bun' && cart.bun?._id === el._id) 
			? 1 
			: cart.ingredients.filter(item => item._id === el._id).length;	

		if ( counter > 0 )
			el.counter = counter;
		else 
			delete el.counter;

		return el;
	});	
    
    return (
        <>          
            <BurgerIngredients ingredients={ingredientSelected} />  
            <BurgerConstructor />
        </>
    );
}

AppMain.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};


export default AppMain;
