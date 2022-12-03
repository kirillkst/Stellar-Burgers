import PropTypes from 'prop-types';

import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

import { ingredientPropTypes } from '../../utils/constants';

const AppMain = ({ ingredients }) => {

    const ingredientSelected = ingredients.map(el => {
		if (
			[
				'Краторная булка N-200i',
				'Говяжий метеорит (отбивная)',
				'Соус Spicy-X',
				'Биокотлета из марсианской Магнолии',
				'Соус традиционный галактический',
				'Хрустящие минеральные кольца',
				'Соус фирменный Space Sauce',
			].includes(el.name)
		) {
			el.counter = 1;
		}

		return el;
	});

	const selected = {
		bun: ingredientSelected.find((el) => el.type === 'bun' && el.counter > 0),
		ingredients: ingredientSelected.filter(el => el.type !== 'bun' && el.counter > 0)
	};

    
    return (
        <>          
            <BurgerIngredients ingredients={ingredientSelected} />  
            <BurgerConstructor {...selected} />
        </>
    );
}

AppMain.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};


export default AppMain;
