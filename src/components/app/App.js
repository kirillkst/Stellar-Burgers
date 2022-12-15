import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ingredientsRequest } from '../../store/ingredientsSlice';
import { reset } from '../../store/cartSlice';
import { renderContent } from '../../utils/burger-utils';
import { MODAL } from '../../utils/constants';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modals/Modal";

import styles from './app.module.scss';


const App = () => {	
    const process = useSelector(store => store.ingredients.process);
	const activeModal = useSelector(store => store.modal.modal);
    const dispatch = useDispatch();	

	useEffect(() => {
        dispatch(ingredientsRequest());      
    }, []);

	
	const content = renderContent(process, AppMain);

	const modal = useMemo(() => {
		switch(activeModal) {
			case MODAL.INGREDIENTS_DETAILS:
				return (
					<Modal title="Детали ингредиента"> 
						<IngredientDetails />
					</Modal>
				);

			case MODAL.ORDER_DETAILS: 
				return (
					<Modal onCloseActions={() => dispatch(reset())}> 
						<OrderDetails />
					</Modal>
				);
			default:
				return;			
		}
	}, [activeModal, dispatch]);


	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<main className={styles.main}>          
				{content}
			</main>				
			{modal}   			
		</div>		
	);
};

export default App;
