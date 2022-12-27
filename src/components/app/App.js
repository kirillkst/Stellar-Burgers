import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetUserQuery, useUserUpdateTokenMutation } from "../../services/userAPI";
import { getCookie } from "../../services/cookie";
import { setUser } from "../../store/userSlice";
import { saveToken } from "../../services/token";

import { HomePage, LoginPage, RegisterPage, ForgotPassword, ResetPassword } from '../../pages';
import AppHeader from '../app-header/AppHeader';

import styles from './app.module.scss';


const App = () => {		
	const dispatch = useDispatch();
	const token = getCookie('token');
	const refreshToken = getCookie('refreshToken');
	
	const user = useGetUserQuery(token);	
    const [userUpdateToken] = useUserUpdateTokenMutation();
	
	
	useEffect(() => {	
		if (user?.success === true) {	
			dispatch(setUser(user.user));
		} else if (user?.error && user.error.data.message === 'jwt expired' && refreshToken) {	
			userUpdateToken({ token: refreshToken })
				.unwrap()
				.then((res) => {
					saveToken(res);
				});		
		}			
	}, [user, dispatch]);

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
