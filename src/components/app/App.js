import { useState, useEffect, useReducer } from 'react';
import useBurgerApi from '../../hooks/useBurgerApi';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';
 
import { CartContext } from '../../services/appContext';
import { renderContent } from '../../utils/burger-services';
import { PROCESS_STATE } from '../../utils/constants';

import styles from './app.module.scss';

const initialCart = { bun: null, ingredients: [], cartTotal: 0 };

function reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case 'add':
			const data = payload.data;
			
			return (payload.type === 'bun')
				? { ...state, bun: data }
				: { ...state, ingredients: [...state.ingredients, data] } 
		case 'total':
			let total = state.bun?.price || 0;
			total += (state.ingredients.length > 0) ? state.ingredients.reduce((acc, el) => acc + el.price, 2 * total) : 0;

			return { ...state, cartTotal: total }
		default:
			throw new Error();
	}
}

const App = () => {	
	const [cart, cartDispatch] = useReducer(reducer, initialCart);
	const [data, setData] = useState([]);	
	const { process, setProcess, getIngredients } = useBurgerApi();

	useEffect(() => {				
		getIngredients()
			.then(res => {
				if (res.success === true && Array.isArray(res.data)) {
					setData(res.data);					
				} else {					
  					throw new Error();
				}
			})
			.then(() => setProcess(PROCESS_STATE.CONFIRMED));
	}, []);

	const content = renderContent(process, AppMain, {
		ingredients: data
	});

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<CartContext.Provider value={{cart, cartDispatch}}>
				<main className={styles.main}>          
					{content}
				</main>	
			</CartContext.Provider>						
		</div>		
	);
};

export default App;
