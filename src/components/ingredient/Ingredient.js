import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import cx from 'classnames';
import PropTypes from 'prop-types';

import store from "../../store";
import { ingredientsSelectors } from '../../store/ingredientsSlice';
import { openModal } from '../../store/modalSlice';
import { INGREDIENTS_TYPES, MODAL } from '../../utils/constants';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.scss';


const Ingredient = ({ _id, type, name, price, image, counter }) => {	
	const dispatch = useDispatch();	

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
			data: ingredient
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
		</div>
	);
};

Ingredient.propTypes = {
	_id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	counter: PropTypes.number
};

export default Ingredient;
