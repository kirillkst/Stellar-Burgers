import { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';
 
import useBurgerApi from '../../hooks/useBurgerApi';
import { CartContext } from '../../services/appContext';
import { cartReducer } from '../../utils/reducers';
import { renderContent } from '../../utils/burger-utils';
import { INITIAL_CART, PROCESS_STATE } from '../../utils/constants';

import store from "../../store";

import styles from './app.module.scss';

import { ingredientsRequest, ingredientsSelectors } from '../../store/ingredients/slice';

const App = () => {	
	const [cart, cartDispatch] = useReducer(cartReducer, INITIAL_CART);
    const process = useSelector(store => store.ingredients.process);
    const dispatch = useDispatch();	

	useEffect(() => {
        dispatch(ingredientsRequest());      
    }, []);

	
	useEffect(() => {
		cartDispatch({ type: 'total' })
	}, [cart.bun, cart.ingredients])

	
	const content = renderContent(process, AppMain);

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
