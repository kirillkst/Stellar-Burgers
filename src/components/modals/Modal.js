import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';

import { MODAL_PLACEMENT, ESC_KEYCODE } from '../../utils/constants';

import styles from './styles/modal.module.scss';

const Modal = ({ children, title, onClose }) => {
	const closeOnEscapeKeyDown = useCallback((e) => {
		if ((e.charCode || e.keyCode) === ESC_KEYCODE) {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		document.addEventListener("keydown", closeOnEscapeKeyDown);

		return () => {
			document.removeEventListener("keydown", closeOnEscapeKeyDown);
		};
	}, [closeOnEscapeKeyDown]);

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
		MODAL_PLACEMENT
	);
};

export default Modal;
