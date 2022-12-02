import { useState, useEffect, useMemo } from 'react';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';

import { renderContent } from '../../utils/burger-services';
import { getIngredients } from '../../utils/burger-api';

import { PROCESS_STATE } from '../../utils/constants';

import styles from './app.module.scss';

const App = () => {	
	const [data, setData] = useState([]);
	const [process, setProcess] = useState(PROCESS_STATE.WAITING);

	useEffect(() => {		
		setProcess(PROCESS_STATE.LOADING);
		
		getIngredients()
			.then(res => {
				if (res.success === true && Array.isArray(res.data)) {
					setData(res.data);					
					setProcess(PROCESS_STATE.CONFIRMED);
				} else {					
  					throw new Error();
				}
			})
			.catch(() => {
				setProcess(PROCESS_STATE.ERROR);
			});
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
