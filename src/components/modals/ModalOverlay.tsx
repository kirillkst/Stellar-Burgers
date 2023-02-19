import PropTypes from 'prop-types';

import styles from './styles/modalOverlay.module.scss';


const ModalOverlay = ({onClose}: {onClose: () => void}) => {
    return (
        <div className={styles.overlay} onClick={onClose} data-testid="close-modal"></div>
    );
};

export default ModalOverlay;
