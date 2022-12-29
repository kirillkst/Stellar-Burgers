import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';

import Profile from "../../components/profile/Profile";

import styles from './profile.module.scss';

const ProfilePage = () => {    
  let { path, url } = useRouteMatch();
  
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
                        <a href="/" className={styles.link}>Выход</a>
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
