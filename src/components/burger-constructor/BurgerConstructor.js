import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './b-constructor.module.scss'; 

const BurgerConstructor = (props) => {
    const {bun, ingredients} = props;

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
                            <span className={styles.itemOrder}><DragIcon type="primary" /></span>
                            <ConstructorElement
                                type="top"
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </li>
                    )
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
                    {ingredients.reduce((acc, el) => acc + el.price, 0)}
                    <CurrencyIcon type="primary" />
                 </div>
                 <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
                    Оформить заказ
                 </Button>
            </div>
        </section>
    );
}

const propTypesTmpl = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string
});

BurgerConstructor.propTypes = {     
    bun: propTypesTmpl,
    ingredients: PropTypes.arrayOf(propTypesTmpl)
};


export default BurgerConstructor;