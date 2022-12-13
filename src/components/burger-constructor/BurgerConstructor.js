import { useState, useContext, useCallback} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart, cartIngredientsSelectors } from '../../store/cart/slice';

import { reset } from '../../store/cart/slice';
import store from "../../store";
import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modals/Modal";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { CartContext } from '../../services/appContext';

import styles from './b-constructor.module.scss';

const BurgerConstructor = () => {		
	
	const { bun, total } = useSelector(store => store.cart, shallowEqual);
	const ingredients = useSelector(cartIngredientsSelectors.selectAll);

	const { cart, cartDispatch } = useContext(CartContext);
	
	
    const dispatch = useDispatch();	
	


	const [orderModal, setOrderModal] = useState(false);

	const createOrder = () => {
		setOrderModal(true)
	}

	const onCloseModal = () => {		
		dispatch(reset());
		setOrderModal(false)
	}

	const renderBun = useCallback((type) => {	
		const suffix = type === 'top' ? ' (верх)' : ' (низ)'
		return (bun)
			? (
				<ConstructorElement
					type={`${type}`}
					isLocked={true}
					text={`${bun.name} ${suffix}`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={styles.item}
				/>
			)
			: (
				<div className={`constructor-element constructor-element_pos_${type} text_type_main-medium justify-content-center ${styles.item}`}>
					Выберите булку
				</div>
			)		
	}, [bun]);
	
	return (
		<section className={styles.wrap}>
			{renderBun('top')}
			<ul className={styles.list}>
				{ingredients.length > 0 ? (
					ingredients.map((ingredient, index) => {
						return (
							<li className={styles.item} key={ingredient.id}>
								<span className={styles.itemOrder}>
									<DragIcon type="primary" />
								</span>
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image}
									handleClose={() => { 
										console.log(ingredient.id);
										dispatch(removeFromCart(ingredient.id)) 
									}}
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
			{renderBun('bottom')}
			
			<div className={styles.checkout}>
				<div className="text text_type_digits-medium">
					{total}
					<CurrencyIcon type="primary" />
				</div>
				{bun && ingredients.length > 0 && (
					<Button
						htmlType="button"
						type="primary"
						size="large"
						extraClass="ml-10"
						onClick={createOrder}
					>
						Оформить заказ
					</Button>
				)}	
			</div>
			{orderModal && (
				<Modal onClose={onCloseModal}> 
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
