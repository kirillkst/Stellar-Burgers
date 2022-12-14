import { useRef } from "react";
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import PropTypes from 'prop-types';

import { removeFromCart } from '../../store/cart/slice';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.scss';


const ConstructorItem = ({ id, name, price, thumbnail, index, moveCard }) => {
    const dispatch = useDispatch();	
    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: 'cartElement',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;
            
            if (!ref.current || dragIndex === hoverIndex) {
                return;
            }
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();           
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();            
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (
                (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || 
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            ) {
                return;
            }            
            
            moveCard(dragIndex, hoverIndex);
            
            item.index = hoverIndex;
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'cartElement',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <li 
            ref={ref}
            className={styles.item}
            data-handler-id={handlerId}
            style={{opacity}}
        >
            <span className={styles.itemOrder}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={thumbnail}
                handleClose={() => {
                    dispatch(removeFromCart(id)) 
                }}
            />
        </li>
    );
};

ConstructorItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
}

export default ConstructorItem;
