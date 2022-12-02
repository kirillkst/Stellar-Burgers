import PropTypes from 'prop-types';

import { ingredientPropTypes } from '../../utils/constants';

import styles from './ingredient-details.module.scss';

const IngredientDetails = (props) => {
    const { image_large, name, fat, carbohydrates, calories, proteins } = props.ingredient;

    return (
        <div className={styles.wrap}>
            <div className={styles.image}>
                <img src={image_large} alt=""/>
            </div>
            <div className={styles.name}>
                {name}
            </div>
            <ul className={styles.details}>
                <li className="text text_type_main-default text_color_inactive">
                    Калории,ккал 
                    <span className="text_type_digits-default mt-2">{calories ?? '-'}</span>
                </li>
                <li className="text text_type_main-default text_color_inactive">
                    Белки, г 
                    <span className="text text_type_digits-default mt-2">{proteins ?? '-'}</span>
                </li> 
                <li className="text text_type_main-default text_color_inactive">
                    Жиры, г 
                    <span className="text text_type_digits-default mt-2">{fat ?? '-'}</span>
                </li>
                <li className="text text_type_main-default text_color_inactive">
                    Углеводы, г 
                    <span className="text text_type_digits-default mt-2">{carbohydrates ?? '-'}</span>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {    
	ingredient: ingredientPropTypes.isRequired
};

export default IngredientDetails;
