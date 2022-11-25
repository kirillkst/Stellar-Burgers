import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './b-constructor.module.scss'; 

import data from '../../utils/data';


const BurgerConstructor = (props) => {
    const bun = data.find(el => el.name == 'Краторная булка N-200i' );

    const ingredients = [
        'Говяжий метеорит (отбивная)',
        'Соус Spicy-X',
        'Биокотлета из марсианской Магнолии',
        'Соус традиционный галактический',
        'Хрустящие минеральные кольца',
        'Хрустящие минеральные кольца',
        'Соус фирменный Space Sauce'
    ];


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
                    const item = data.find(el => el.name == ingredient );  
                    return (
                        <li className={styles.item} key={index}>    
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type="top"
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
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
                    610 
                    <CurrencyIcon type="primary" />
                 </div>
                 <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
                    Оформить заказ
                 </Button>
            </div>

        </section>
    );
}

BurgerConstructor.propTypes = {
    
};


export default BurgerConstructor;