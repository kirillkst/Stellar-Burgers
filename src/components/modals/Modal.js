import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';

import styles from './styles/modal.module.scss';

const Modal = ({ show, children, title, onClose }) => {
	const closeOnEscapeKeyDown = useCallback((e) => {
		if ((e.charCode || e.keyCode) === 27) {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		document.addEventListener("keydown", closeOnEscapeKeyDown);

		return() => {
			document.removeEventListener("keydown", closeOnEscapeKeyDown);
		};
	}, [closeOnEscapeKeyDown]);

	
	if (!show) 
    	return null;

	return ReactDOM.createPortal(
		<>
			<div className={styles.modal}>
				<div className={styles.header} onClose={onClose}>
					<span className="text text_type_main-large">{title}</span>
					<CloseIcon type="primary" onClick={onClose} />
				</div>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		document.getElementById('react-modals')
	);
};

export default Modal;
