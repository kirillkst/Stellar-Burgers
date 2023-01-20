import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { closeModal } from '../../store/modalSlice';
import { MODAL_ROOT, ESC_KEYCODE } from '../../utils/constants';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';


import styles from './styles/modal.module.scss';
import { TModal } from '../../utils/types';

const Modal = ({ children, title, onCloseAction }: TModal) => {	
	const dispatch = useDispatch();	

	const onClose = useCallback(() => {
		onCloseAction?.();
		dispatch(closeModal());
	}, [dispatch, onCloseAction]);

	const closeOnEscapeKeyDown = useCallback((e: KeyboardEvent) => {
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
				<div className={styles.header}>
					<span className="text text_type_main-large">{title}</span>
					<CloseIcon type="primary" onClick={onClose} />
				</div>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		MODAL_ROOT as HTMLElement
	);
};

export default Modal;
