import { useState, useEffect, useMemo } from 'react';

import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';

import setContent from '../../utils/setContent';
import { API_URL } from '../../utils/constants';

import styles from './app.module.scss';

const App = () => {	
	const [data, setData] = useState([]);
	const [process, setProcess] = useState('waiting');

	useEffect(() => {		
		setProcess('loading');

		fetch(API_URL)
			.then(r => r.json())
			.then(res => {
				if (res.success === true && Array.isArray(res.data)) {
					setData(res.data);					
					setProcess('confirmed');
				} else {					
  					throw new Error();
				}
			})
			.catch(() => {
				setProcess('error');
			});

	}, []);

	const content = useMemo(() => {
        return setContent(process, AppMain, {
			ingredients: data
		});
    }, [process, data])

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
