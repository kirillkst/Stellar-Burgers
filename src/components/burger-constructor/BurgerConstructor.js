import { useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';

import OrderDetails from '../modals/OrderDetails';
import Modal from "../modals/Modal";
import ErrorMessage from '../errors/ErrorMessage';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './b-constructor.module.scss';

const BurgerConstructor = ({ bun, ingredients }) => {
	const [orderModal, setOrderModal] = useState(null);

	const handleOpenModal = () => {
		const modalData = (
			<Modal 
				show={true} 
				onClose={() => setOrderModal(null)}
			> 
				<OrderDetails/>
			</Modal>
		)
		
		setOrderModal(modalData);		
	};

	return (
		<section className={styles.wrap}>
			<ConstructorElement
				type="top"
				isLocked={true}
				text={`${bun.name} (верх)`}
				price={bun.price}
				thumbnail={bun.image}
				extraClass={styles.item}
			/>
			<ul className={styles.list}>
				{ingredients.map((ingredient, index) => {
					return (
						<li className={styles.item} key={index}>
							<span className={styles.itemOrder}>
								<DragIcon type="primary" />
							</span>
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						</li>
					);
				})}
			</ul>
			<ConstructorElement
				type="bottom"
				isLocked={true}
				text={`${bun.name} (низ)`}
				price={bun.price}
				thumbnail={bun.image}
				extraClass={styles.item}
			/>
			<div className={styles.checkout}>
				<div className="text text_type_digits-medium">
					{ingredients.reduce((acc, el) => acc + el.price, 2 * bun.price)}
					<CurrencyIcon type="primary" />
				</div>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={handleOpenModal}
				>
					Оформить заказ
				</Button>
			</div>
			{orderModal}
		</section>
	);
};

BurgerConstructor.propTypes = {
	bun: ingredientPropTypes.isRequired,
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
};

export default BurgerConstructor;
