import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

import styles from './app.module.scss';

import data from '../../utils/data';

const App = () => {
	const ingredients = data.map(el => {
		if (
			[
				'Краторная булка N-200i',
				'Говяжий метеорит (отбивная)',
				'Соус Spicy-X',
				'Биокотлета из марсианской Магнолии',
				'Соус традиционный галактический',
				'Хрустящие минеральные кольца',
				'Хрустящие минеральные кольца',
				'Соус фирменный Space Sauce',
			].includes(el.name)
		) {
			el.counter = 1;
		}

		return el;
	});

	const selected = {
		bun: data.find((el) => el.name === 'Краторная булка N-200i'),
		ingredients: data.filter(el =>
			[
				'Говяжий метеорит (отбивная)',
				'Соус Spicy-X',
				'Биокотлета из марсианской Магнолии',
				'Соус традиционный галактический',
				'Хрустящие минеральные кольца',
				'Хрустящие минеральные кольца',
				'Соус фирменный Space Sauce',
			].includes(el.name)
		),
	};

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor {...selected} />
			</main>
		</div>
	);
};

export default App;
