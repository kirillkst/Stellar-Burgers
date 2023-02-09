import { useDrag } from "react-dnd";
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import store, { useDispatch } from "../../store";
import { ingredientsSelectors } from '../../store/ingredientsSlice';
import { openModal } from '../../store/modalSlice';
import { INGREDIENTS_TYPES, MODAL } from '../../utils/constants';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.scss';
import { TIngredient } from '../../utils/types';


const Ingredient = ({ _id, type, name, price, image, counter } : TIngredient) => {	
	const dispatch = useDispatch();	
	let location = useLocation();

	const [{ isDrag }, dragRef] = useDrag({
		type: type === INGREDIENTS_TYPES.BUN.key ? 'bun' : 'ingredient',
        item: { _id },
		collect: monitor => ({
            isDrag: monitor.isDragging()
        })
	});

	const onClick = () => {	
		const ingredient = ingredientsSelectors.selectById(store.getState(), _id);

		dispatch(openModal({
			modal: MODAL.INGREDIENTS_DETAILS,
			data: ingredient?._id
		}));	
	}

	return (
		<div className={cx(styles.wrap, { 
				[styles['is-dragging']]: isDrag 
			})} 
			onClick={onClick} 
			ref={dragRef}
		 >
			<div className={styles.image}>
				<img src={image} alt={name}/>
			</div>
			<div className={styles.price}>
				{price}
				<CurrencyIcon type="primary" />
			</div>
			<div className={styles.name}>{name}</div>
			{counter > 0 && (
				<Counter
					count={counter}
					size="default"
					extraClass="m-1"
				/>
			)}
			
			<Link
				to={{
					pathname: `/ingredients/${_id}`,
					state: { background: location }
				}}
				className={styles.link}
			>
			</Link>
		</div>
	);
};

export default Ingredient;
