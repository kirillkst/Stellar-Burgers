import styles from './styles/modalOverlay.module.scss';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    );
};


export default ModalOverlay;
