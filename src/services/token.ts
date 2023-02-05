import { setCookie } from './cookie';

export const saveToken = (res: { [key: string]: any }) => {
	if (res.accessToken.indexOf('Bearer') === 0)
		setCookie('token', res.accessToken.split('Bearer ')[1]);

	if (res?.refreshToken) 
        setCookie('refreshToken', res.refreshToken);
};
