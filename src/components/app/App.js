import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetUserQuery, useUserUpdateTokenMutation } from "../../services/userAPI";
import { getCookie } from "../../services/cookie";
import { setUser } from "../../store/userSlice";
import { saveToken } from "../../services/token";

import { HomePage, LoginPage, RegisterPage, ForgotPassword, ResetPassword, ProfilePage } from '../../pages';
import AppHeader from '../app-header/AppHeader';
import Spinner from "../spinner/Spinner";

import styles from './app.module.scss';


const App = () => {		
	const dispatch = useDispatch();
	const [authLoading, setAuthLoading] = useState(true);
	const token = getCookie('token');
	const refreshToken = getCookie('refreshToken');
	const user = useGetUserQuery(token, {skip: !token});
    const [userUpdateToken] = useUserUpdateTokenMutation();

	useEffect(() => {	
		if (!token )
			setAuthLoading(false);

		if (user.isSuccess) {
			dispatch(setUser(user.data.user));
			setAuthLoading(false);
		} else if (user.isError) {
			if (user.error.data.message === 'jwt expired' && refreshToken) {
				userUpdateToken({ token: refreshToken })
					.unwrap()
					.then((res) => {
						saveToken(res);
					});		
			} else {
				setAuthLoading(false);
			}	
		}	
	}, [user, userUpdateToken, token, refreshToken, dispatch]);

	if (authLoading)
		return <Spinner />

	return (
		<div className={styles.wrapper}>
			<Router>
				<AppHeader />
				<main className={styles.main}>    
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
						<Route path="/profile">
							<ProfilePage />
						</Route>																						
					</Switch>
			
				</main>	
			</Router>  			
		</div>		
	);
};

export default App;
