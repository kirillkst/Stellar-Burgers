import { Switch, Route, NavLink, useRouteMatch, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import { getCookie, deleteCookie } from "../../services/cookie";
import { resetUser } from "../../store/userSlice";
import { useAuthUserMutation } from "../../services/userAPI";

import Profile from "../../components/profile/Profile";

import styles from './profile.module.scss';

const ProfilePage = () => {    
    let { path, url } = useRouteMatch();
    const history = useHistory(); 
    const dispatch = useDispatch();	
    const [auth, { isLoading, isError }] = useAuthUserMutation();

    const logout = (e) => {
        e.preventDefault();        
        auth({ type: 'logout', payload: {
            token: getCookie('refreshToken')
        } })
            .unwrap()
            .then(res => {
                if (res.success) {                 
                    dispatch(resetUser());            
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
                <p className="mt-20 text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <Switch>
                <Route path={path} exact={true}>
                    <Profile />
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                    История заказов
                </Route>
                <Route path={`${path}/orders/:id`} exact={true}>
                    
                </Route>
            </Switch>
        </div>
    );
};

export default ProfilePage;
