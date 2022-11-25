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
            {counter && <Counter count={counter} size="default" extraClass="m-1" />}
        </div>
    );
}


Ingredient.propTypes = {
    name: PropTypes.string, 
    price: PropTypes.number, 
    image: PropTypes.string, 
    counter: PropTypes.number
};

export default Ingredient;