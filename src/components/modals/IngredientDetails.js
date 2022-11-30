import PropTypes from 'prop-types';

import styles from './styles/ingredient-details.module.scss';

const IngredientDetails = ({ image_large, name, fat, carbohydrates, calories, proteins }) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.image}>
                <img src={image_large} alt=""/>
            </div>
            <div className={styles.name}>
                {name}
            </div>
            <ul className={styles.details}>
                {calories && (
                    <li className="text text_type_main-default text_color_inactive">
                        Калории,ккал 
                        <span className="text_type_digits-default mt-2">{calories}</span>
                    </li>
                )}
                {proteins && (
                    <li className="text text_type_main-default text_color_inactive">
                        Белки, г 
                        <span className="text text_type_digits-default mt-2">{proteins}</span>
                    </li>
                )}
                {fat && (
                    <li className="text text_type_main-default text_color_inactive">
                        Жиры, г 
                        <span className="text text_type_digits-default mt-2">{fat}</span>
                    </li>
                )}
                {carbohydrates && (
                    <li className="text text_type_main-default text_color_inactive">
                        Углеводы, г 
                        <span className="text text_type_digits-default mt-2">{carbohydrates}</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {    
	image_large: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default IngredientDetails;
