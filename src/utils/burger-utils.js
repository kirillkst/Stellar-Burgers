import { getUserRequest, updateTokenRequest } from '../store/userSlice';
import { getCookie } from '../services/cookie';
import { saveToken } from "../services/token";

import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errors/ErrorMessage';

import { PROCESS_STATE } from './constants';

export const renderContent = (process, Component, data) => {
	switch (process) {
		case PROCESS_STATE.WAITING:
			return <Spinner />;
		case PROCESS_STATE.LOADING:
			return <Spinner />;
		case PROCESS_STATE.CONFIRMED:
			return <Component {...data} />;
		case PROCESS_STATE.ERROR:
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

export const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
