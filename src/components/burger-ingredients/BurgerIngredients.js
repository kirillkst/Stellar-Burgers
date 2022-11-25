import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/Ingredient";

import styles from './b-ingredients.module.scss'; 

const BurgerIngredients = (props) => {
    const types = [
        {
            key: "bun",
            name: "Булки"
        },
        {
            key: "sauce",
            name: "Соусы"
        },
        {
            key: "main",
            name: "Начинки"
        }
    ];

    return (
        <section className={styles.wrap}>
            <h1 className="pb-5 text text_type_main-large">Соберите бургер</h1>
            <div style={{ display: 'flex' }} className="pb-10">
                {types.map((type, index) => (
                    <Tab 
                        value={type.key} 
                        key={index}
                        active={index === 0}
                        >
                        {type.name}
                    </Tab>
                ))}
            </div>
            <div className={styles.components}>
                {types.map((type, index) => (
                    <section className={styles.component} key={index} id={type.key}>
                        <h2 className="pt-10 pb-6 text text_type_main-medium">{type.name}</h2>
                        <ul className={styles.list}>
                            {props.ingredients
                                .filter(item => item.type === type.key)
                                .map(item => (
                                    <li key={item._id}>
                                        <Ingredient {...item} />
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                ))}                
            </div>
        </section>
    );
}


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
      })),
};

export default BurgerIngredients;