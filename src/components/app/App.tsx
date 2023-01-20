import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetUserQuery, useUserUpdateTokenMutation } from "../../services/userAPI";
import { getCookie } from "../../services/cookie";
import { setUser } from "../../store/userSlice";
import { saveToken } from "../../services/token";

import { ingredientsRequest } from '../../store/ingredientsSlice';
import { PROCESS_STATE } from "../../utils/constants";

import { HomePage, LoginPage, RegisterPage, ForgotPassword, ResetPassword, ProfilePage, IngredientPage, NotFound } from '../../pages';
import AppHeader from '../app-header/AppHeader';
import Spinner from "../spinner/Spinner";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Modal from "../modals/Modal";
import IngredientDetails from '../ingredient-details/IngredientDetails';

import styles from './app.module.scss';
import { useAppDispatch, useAppSelector } from "../../store";
import { TLocation } from "../../utils/types";


const App = () => {		
	const dispatch = useAppDispatch();
	const [authLoading, setAuthLoading] = useState(true);
	const token = getCookie('token');
	const refreshToken = getCookie('refreshToken');
	const user = useGetUserQuery<any>(token, {skip: !token});
    const [userUpdateToken] = useUserUpdateTokenMutation();	
    const ingredientsProcess = useAppSelector<typeof PROCESS_STATE[keyof typeof PROCESS_STATE]>(store => store.ingredients.process);	
	const history = useHistory();
	const location = useLocation<TLocation | any>();
	const background = location.state && location.state.background;

	
	useEffect(() => {
        dispatch(ingredientsRequest());    ;
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
					<ProtectedRoute path="/login" onlyForAuth={false} exact={true}>
						<LoginPage />
					</ProtectedRoute>	
					<ProtectedRoute path="/register" onlyForAuth={false} exact={true}>
						<RegisterPage />
					</ProtectedRoute>	
					<ProtectedRoute path="/profile" onlyForAuth={true}>
						<ProfilePage />
					</ProtectedRoute>	
					<ProtectedRoute path="/forgot-password" onlyForAuth={false} exact={true}>
						<ForgotPassword />
					</ProtectedRoute>	
					<ProtectedRoute path="/reset-password" onlyForAuth={false} exact={true}>
						<ResetPassword />
					</ProtectedRoute>	
					<Route path="*">
						<NotFound />
					</Route>																										
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