import PropTypes from 'prop-types';
import cx from 'classnames';

import { ingredientPropTypes } from '../../utils/prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../burger-constructor/b-constructor.module.scss';

const ConstructorBun = ({ bun, type }) => {
    const suffix = type === 'top' ? ' (верх)' : ' (низ)';

    return (bun) ? (
        <ConstructorElement
            type={`${type}`}
            isLocked={true}
            text={`${bun.name} ${suffix}`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={cx(styles.item, styles.bun)} 
        />
    ) : (
        <div className={`constructor-element constructor-element_pos_${type} text_type_main-medium justify-content-center ${styles.item} ${styles.bun}`}>
            Выберите булку
        </div>				
    )
};

ConstructorBun.propTypes = {
    bun: ingredientPropTypes, //Без isRequired, т.к ничего нет, пока пользователь не добавит 
    type: PropTypes.string.isRequired
};

export default ConstructorBun;
