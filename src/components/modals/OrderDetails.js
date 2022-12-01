import PropTypes from 'prop-types';

import donePng from '../../img/done.png';
import styles from './styles/order-details.module.scss';

const OrderDetails = ({ orderNum }) => {
    return (
        <div className={styles.wrap}>
            <div className="pt-15 mb-8 text text_type_digits-large">{orderNum}</div>
            <div className="text text_type_main-medium mb-15">идентификатор заказа</div>
            <img src={donePng} alt="" className="mb-15" />
            <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
            <div className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</div>            
        </div>
    );
};

OrderDetails.propTypes = {    
	orderNum: PropTypes.string.isRequired
};


export default OrderDetails;
