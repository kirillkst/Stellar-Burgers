import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetUserQuery, useUserUpdateTokenMutation } from "../../services/userAPI";
import { getCookie } from "../../services/cookie";
import { setUser } from "../../store/userSlice";
import { saveToken } from "../../services/token";

import { ingredientsRequest } from '../../store/ingredientsSlice';
import { PROCESS_STATE } from "../../utils/constants";

import { HomePage, LoginPage, RegisterPage, ForgotPassword, ResetPassword, ProfilePage, IngredientPage } from '../../pages';
import AppHeader from '../app-header/AppHeader';
import Spinner from "../spinner/Spinner";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Modal from "../modals/Modal";
import IngredientDetails from '../ingredient-details/IngredientDetails';

import styles from './app.module.scss';


const App = () => {		
	const dispatch = useDispatch();
	const [authLoading, setAuthLoading] = useState(true);
	const token = getCookie('token');
	const refreshToken = getCookie('refreshToken');
	const user = useGetUserQuery(token, {skip: !token});
    const [userUpdateToken] = useUserUpdateTokenMutation();	
    const ingredientsProcess = useSelector(store => store.ingredients.process);	
	const history = useHistory();
	const location = useLocation();
	const background = location.state && location.state.background;

	
	useEffect(() => {
        dispatch(ingredientsRequest());      
    }, []);

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
					})
					.catch(() => {});
			} else {
				setAuthLoading(false);
			}	
		}	
	}, [user, userUpdateToken, token, refreshToken, dispatch]);

	if (authLoading || ingredientsProcess !== PROCESS_STATE.CONFIRMED )
		return <Spinner />

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<main className={styles.main}>    
				<Switch location={background || location}>
					<Route path="/" exact={true}>
						<HomePage />
					</Route>
					<Route path="/ingredients/:id" exact={true}>
						<IngredientPage />
					</Route>						
					<ProtectedRoute path="/login" forAuth={true} exact={true}>
						<LoginPage />
					</ProtectedRoute>	
					<ProtectedRoute path="/register" forAuth={true} exact={true}>
						<RegisterPage />
					</ProtectedRoute>	
					<ProtectedRoute path="/profile" forAuth={false}>
						<ProfilePage />
					</ProtectedRoute>	
					<ProtectedRoute path="/forgot-password" forAuth={true} exact={true}>
						<ForgotPassword />
					</ProtectedRoute>	
					<ProtectedRoute path="/reset-password" forAuth={true} exact={true}>
						<ResetPassword />
					</ProtectedRoute>																						
				</Switch>	

				{background && (
					<Route path="/ingredients/:id" >
						<Modal title="Детали ингредиента" onCloseAction={() => history.goBack()}> 
							<IngredientDetails />
						</Modal>
					</Route>
				)}

			</main>	  			
		</div>		
	);
};

export default App;
