import { checkReponse } from './burger-services';
import { API_URL } from './constants';

export const getIngredients = () => {
	return fetch(`${API_URL}/ingredients`)
            .then(checkReponse);
};
