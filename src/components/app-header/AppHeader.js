import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.scss'; 
import cx from 'classnames';

const AppHeader = () => {
    return (
        <header className={styles.wrap}>
           <div className={styles.inner}>
                <nav className={styles.navbar}>
                    <ul>
                        <li>
                            <a 
                                href="/" 
                                className={cx(
                                    styles.link, 
                                    {[styles['link--active']]: true}
                                )}>
                                <BurgerIcon type="secondary"/>
                                Конструктор
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/"
                                className={cx(
                                    styles.link, 
                                    {[styles['link--active']]: false}
                                )}>
                                <ListIcon type="secondary" />
                                Лента заказов
                            </a>
                        </li>
                    </ul>
                </nav>
                <a href="/" className={styles.logo}>
                    <Logo />
                </a>
                <div className={styles.profile}>
                    <a 
                        href="/" 
                        className={cx(
                            styles.link, 
                            {[styles['link--active']]: false}
                        )}>                        
                        <ProfileIcon type="secondary" />
                        Личный кабинет
                    </a>
                </div>                   
            </div>                  
        </header>
    );
}

export default AppHeader;