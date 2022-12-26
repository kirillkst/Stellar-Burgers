import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPassword, ResetPassword } from '../../pages';

import AppHeader from '../app-header/AppHeader';

import styles from './app.module.scss';


const App = () => {	
	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<main className={styles.main}>          
				<Router>
					<Switch>
						<Route path="/" exact={true}>
							<HomePage />
						</Route>
						<Route path="/login" exact={true}>
							<LoginPage />
						</Route>	
						<Route path="/register" exact={true}>
							<RegisterPage />
						</Route>
						<Route path="/forgot-password" exact={true}>
							<ForgotPassword />
						</Route>	
						<Route path="/reset-password" exact={true}>
							<ResetPassword />
						</Route>																	
					</Switch>
				</Router>
			</main>	  			
		</div>		
	);
};

export default App;
