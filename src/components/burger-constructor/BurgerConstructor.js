import { useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import cx from 'classnames';

import store from "../../store";
import { ingredientsSelectors } from '../../store/ingredients/slice';
import { addToCart, removeFromCart, reset } from '../../store/cart/slice';
import { ingredientPropTypes } from '../../utils/prop-types';

import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modals/Modal";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './b-constructor.module.scss';


const BurgerConstructor = ({ bun, ingredients, total }) => {		
    const dispatch = useDispatch();	
	const [orderModal, setOrderModal] = useState(false);

	const [{ dropTargetHover, dropType }, dropTarget] = useDrop({
        accept: ['bun', 'ingredient'],
        drop(itemId) {
            onDropHandler(itemId);
        },
		collect: monitor => ({
            dropTargetHover: monitor.isOver(),
			dropType: monitor.getItemType()
        })
    });

	const onDropHandler = ({ _id }) => {	
		const ingredient = ingredientsSelectors.selectById(store.getState(), _id);
		dispatch(addToCart(ingredient));	
	};

	const createOrder = () => {
		setOrderModal(true)
	}

	const onCloseModal = () => {		
		dispatch(reset());
		setOrderModal(false)
	}

	const renderBun = useCallback((type) => {	
		const suffix = type === 'top' ? ' (верх)' : ' (низ)';
		return (bun) ? (
				<ConstructorElement
					type={`${type}`}
					isLocked={true}
					text={`${bun.name} ${suffix}`}
					price={bun.price}
					thumbnail={bun.image}
					extraClass={cx(styles.item, styles.bun)} 
				/>
			) : (
				<div className={`constructor-element constructor-element_pos_${type} text_type_main-medium justify-content-center ${styles.item} ${styles.bun}`}>
					Выберите булку
				</div>				
			)			
	}, [bun]);

	

	return (
		<section className={cx({
				[styles.wrap]: true,
				[styles.dropBun]: dropType === 'bun',
				[styles.dropIngredient]: dropType === 'ingredient' 
			})} 
			ref={dropTarget}
		>
			{renderBun('top')}
			<ul className={cx(styles.list, styles.ingredients)}>
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

BurgerConstructor.propTypes = {
	bun: ingredientPropTypes,
	ingredients: PropTypes.arrayOf(ingredientPropTypes),
	total: PropTypes.number
};

export default BurgerConstructor;
