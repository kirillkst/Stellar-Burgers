import { NavLink, Link } from 'react-router-dom';

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
							<NavLink 
								to='/'
								exact={true}
								className={styles.link}
								activeClassName={styles['link--active']}
							>
								<BurgerIcon type="secondary" />
								Конструктор
							</NavLink>
						</li>
						<li>
							<Link
								to="/"
								className={cx(styles.link, { 
                                    [styles['link--active']]: false 
                                })}
							>
								<ListIcon type="secondary" />
								Лента заказов
							</Link>
						</li>
					</ul>
				</nav>
				<Link
					to="/"
					className={styles.logo}
				>
					<Logo />
				</Link>
				<div className={styles.profile}>
					<NavLink 
						to='/profile'
						className={styles.link}
						activeClassName={styles['link--active']}
					>
						<ProfileIcon type="secondary" />
						Личный кабинет
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
