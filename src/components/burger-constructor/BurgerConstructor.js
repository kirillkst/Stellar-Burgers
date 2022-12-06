import { useEffect, useState, useContext } from 'react';

import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modals/Modal";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { CartContext } from '../../services/appContext';

import styles from './b-constructor.module.scss';

const BurgerConstructor = () => {		
	const { cart } = useContext(CartContext);
	const { bun, ingredients, cartTotal } = cart;

	const [orderData, setOrderData] = useState(null);

	const createOrder = () => {
		setOrderData({
			number: '034536'
		})
	}
	
	return (
		<section className={styles.wrap}>
			{bun ? (
				<ConstructorElement
					type="top"
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={styles.item}
				/>
			) : (
				<div className={`constructor-element constructor-element_pos_top text_type_main-medium justify-content-center ${styles.item}`}>
					Выберите булку
				</div>
			)}
			<ul className={styles.list}>
				{ingredients.length > 0 ? (
					ingredients.map((ingredient, index) => {
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
					})
				) : (					
					<div className={`constructor-element text_type_main-medium justify-content-center ${styles.item}`}>
						Выберите начинку
					</div>
				)}
			</ul>
			{bun ? (
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={styles.item}
				/>
			) : (
				<div className={`constructor-element constructor-element_pos_bottom text_type_main-medium justify-content-center ${styles.item}`}>
					Выберите булку
				</div>
			)}
			
			<div className={styles.checkout}>
				<div className="text text_type_digits-medium">
					{cartTotal}
					<CurrencyIcon type="primary" />
				</div>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={createOrder}
				>
					Оформить заказ
				</Button>
			</div>
			{orderData && (
				<Modal onClose={() => setOrderData(null)}> 
					<OrderDetails {...orderData}/>
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
