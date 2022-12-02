import { API_URL } from './constants';

import useHttp from '../hooks/useHttp';

const useBurgerApi = () => {
    const {request, process, setProcess} = useHttp();

    const getIngredients = async () => {
        return await request(`${API_URL}/ingredients`);
    };

    return {getIngredients, process, setProcess}
}

export default useBurgerApi;
