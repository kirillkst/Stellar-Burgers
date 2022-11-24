import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.scss';

const Ingredient = (props) => {
   const {name, price, image, counter} = props;

    return (
        <div className={styles.wrap}>
            <div className={styles.image}>
                <img src={image} alt="" />
            </div>          
            <div className={styles.price}>
                {price}                
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.name}>{name}</div>
            <Counter count={1} size="default" extraClass="m-1" />
        </div>
    );
}

Ingredient.propTypes = {
    
};

export default Ingredient;