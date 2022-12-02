import { useState, useEffect } from 'react';
import useBurgerApi from '../../utils/burger-api';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';

import { renderContent } from '../../utils/burger-services';

import { PROCESS_STATE } from '../../utils/constants';

import styles from './app.module.scss';

const App = () => {	
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
			<main className={styles.main}>          
				{content}
			</main>				
		</div>
	);
};

export default App;
