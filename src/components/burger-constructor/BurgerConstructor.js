import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import cx from 'classnames';
import { useHistory } from 'react-router-dom';

import store from "../../store";
import { ingredientsSelectors } from '../../store/ingredientsSlice';
import { addToCart, moveIngredient, reset } from '../../store/cartSlice';
import { createOrderRequest } from "../../store/orderSlice";
import { openModal } from '../../store/modalSlice';
import { MODAL } from '../../utils/constants';
import { ingredientPropTypes } from '../../utils/prop-types';

import ConstructorBun from "../constructor-bun/ConstructorBun";
import ConstructorItem from "../constructor-item/ConstructorItem";
import OrderDetails from '../order-details/OrderDetails';
import Modal from "../modals/Modal";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './b-constructor.module.scss';


const BurgerConstructor = ({ bun, ingredients, total }) => {	
	const activeModal = useSelector(store => store.modal.modal);
	const isAuth = useSelector((store) => store.user.auth);
	const history = useHistory();

    const dispatch = useDispatch();	

	const [{ dropType }, dropTarget] = useDrop({
        accept: ['bun', 'ingredient'],
        drop(itemId) {
            onDropHandler(itemId);
        },
		collect: monitor => ({
			dropType: monitor.getItemType()
        })
    });

	const onDropHandler = ({ _id }) => {	
		const ingredient = ingredientsSelectors.selectById(store.getState(), _id);
		dispatch(addToCart(ingredient));	
	};

	const createOrder = () => {
		if (!isAuth) {
			history.push('/login');
			return;
		}

		dispatch(createOrderRequest(
			[bun._id, ...ingredients.map(el => el._id)]
		));    

		//В мод. окне реакция на нажатие (спиннер загрузки) -> номер заказа, если успешно -> вывод ошибки, если заказ не создан
		dispatch(openModal({
			modal: MODAL.ORDER_DETAILS
		}))
	}

	const moveCard = useCallback((dragIndex, hoverIndex) => {
		dispatch(moveIngredient({
			dragIndex,
			hoverIndex
		}));
	  }, []);

	
	return (
		<section className={cx({
				[styles.wrap]: true,
				[styles.dropBun]: dropType === 'bun',
				[styles.dropIngredient]: dropType === 'ingredient' 
			})} 
			ref={dropTarget}
		>
			<ConstructorBun bun={bun} type='top' />
			<ul className={cx(styles.list, styles.ingredients)}>
				{ingredients.length > 0 ? (
					ingredients.map((ingredient, index) => {
						return (
							<ConstructorItem 
								key={ingredient.id}
								id={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
								index={index}
								moveCard={moveCard}
							/>
						);
					})
				) : (					
					<div className={`constructor-element text_type_main-medium justify-content-center ${styles.item}`}>
						Выберите начинку
					</div>
				)}
			</ul>
			<ConstructorBun bun={bun} type='bottom' />
			
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

			{activeModal === MODAL.ORDER_DETAILS && (
				<Modal onCloseAction={() => dispatch(reset())}> 
					<OrderDetails />
				</Modal>
			)}

		</section>
	);
};

BurgerConstructor.propTypes = {
	bun: ingredientPropTypes, //Без isRequired, т.к ничего нет, пока пользователь не добавит 
	ingredients: PropTypes.arrayOf(ingredientPropTypes), //Без isRequired, т.к ничего нет, пока пользователь не добавит 
	total: PropTypes.number.isRequired
};

export default BurgerConstructor;
