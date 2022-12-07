import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

import { CartContext } from '../../services/appContext';
import { INGREDIENTS_TYPES } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/prop-types';

const AppMain = ({ ingredients }) => {
	const { cart } = useContext(CartContext);

	const ingredientSelected = useMemo(() => {
		return ingredients.map(el => {
			const counter = (el.type === INGREDIENTS_TYPES.BUN.key && cart.bun?._id === el._id) 
				? 1 
				: cart.ingredients.filter(item => item._id === el._id).length;	
	
			if ( counter > 0 )
				el.counter = counter;
			else 
				delete el.counter;
	
			return el;
		})
	}, [cart.bun, cart.ingredients, ingredients]);	
		    
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
