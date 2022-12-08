import { useState, useEffect, useReducer } from 'react';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';
 
import useBurgerApi from '../../hooks/useBurgerApi';
import { CartContext } from '../../services/appContext';
import { cartReducer } from '../../utils/reducers';
import { renderContent } from '../../utils/burger-utils';
import { INITIAL_CART, PROCESS_STATE } from '../../utils/constants';

import styles from './app.module.scss';

const App = () => {	
	const [cart, cartDispatch] = useReducer(cartReducer, INITIAL_CART);
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
			.then(() => setProcess(PROCESS_STATE.CONFIRMED))
			.catch(); //Обработка ошибок в хуке useHttp
	}, []);
	
	useEffect(() => {
		cartDispatch({ type: 'total' })
	}, [cart.bun, cart.ingredients])

	
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
