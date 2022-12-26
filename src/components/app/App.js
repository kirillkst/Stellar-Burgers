import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ingredientsRequest } from '../../store/ingredientsSlice';
import { renderContent } from '../../utils/burger-utils';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';

import styles from './app.module.scss';


const App = () => {	
    const process = useSelector(store => store.ingredients.process);
    const dispatch = useDispatch();	

	useEffect(() => {
        dispatch(ingredientsRequest());      
    }, []);
	
	const content = renderContent(process, AppMain);

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<main className={styles.main}>          
				{content}
			</main>	  			
		</div>		
	);
};

export default App;
