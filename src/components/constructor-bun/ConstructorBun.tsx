import PropTypes from 'prop-types';
import cx from 'classnames';

import { ingredientPropTypes } from '../../utils/prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../burger-constructor/b-constructor.module.scss';
import { TIngredient } from '../../utils/types';

const ConstructorBun = ({ bun, type } : { bun: TIngredient, type: 'top' | 'bottom'}) => {
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

export default ConstructorBun;
