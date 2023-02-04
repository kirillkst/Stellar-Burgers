import { Switch, Route, NavLink, useRouteMatch, useHistory, Redirect } from 'react-router-dom';
import { getCookie, deleteCookie } from "../../services/cookie";
import { logoutRequest } from "../../store/userSlice";
import Profile from "../../components/profile/Profile";
import ProfileOrders from "../../components/profile-orders/ProfileOrders";

import styles from './profile.module.scss';
import { useDispatch } from '../../store';

const ProfilePage = () => {    
    let { path, url } = useRouteMatch();
    const history = useHistory(); 
    const dispatch = useDispatch();	

    const logout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        dispatch(logoutRequest({
            token: getCookie('refreshToken')
        }))
            .unwrap()
            .then(res => {
                if (res.success) {                       
                    deleteCookie('token');
                    deleteCookie('refreshToken'); 
                    history.push('/login');
                }
            })
            .catch(() => {});
    } 
  
    return (
        <div className={styles.wrap}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink className={styles.link} to={`${url}`} exact={true}>Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.link} to={`${url}/orders`} exact={true}>История заказов</NavLink>
                    </li>
                    <li>
                        <a href="/login" onClick={logout} className={styles.link}>Выход</a>
                    </li>
                </ul>
                <p className="mt-20 text text_type_main-small text_color_inactive">
                    <Switch>
                        <Route path={path} exact={true}>
                            В этом разделе вы можете изменить свои персональные данные
                        </Route>
                        <Route path={`${path}/orders`} exact={true}>
                            В этом разделе вы можете просмотреть свою историю заказов
                        </Route>
                    </Switch>                   
                </p>
            </nav>
            <Switch>
                <Route path={path} exact={true}>
                    <Profile />
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                    <ProfileOrders />
                </Route>
            </Switch>
        </div>
    );
};

export default ProfilePage;
