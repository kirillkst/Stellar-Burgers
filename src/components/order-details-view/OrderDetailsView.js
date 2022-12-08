import PropTypes from 'prop-types';
import donePng from '../../images/done.png';

const OrderDetailsView = ({ number }) => {    
    return (
        <>
            <div className="pt-15 mb-8 text text_type_digits-large">{number}</div>
            <div className="text text_type_main-medium mb-15">идентификатор заказа</div>
            <img src={donePng} alt="Заказ принят" className="mb-15" />
            <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
            <div className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</div>       
        </>
    )
};

OrderDetailsView.propTypes = {    
	number: PropTypes.number.isRequired
};

export default OrderDetailsView;
