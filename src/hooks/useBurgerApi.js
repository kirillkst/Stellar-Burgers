import { API_URL } from '../utils/constants';

import useHttp from './useHttp';

const useBurgerApi = () => {
    const {request, process, setProcess} = useHttp();

    const getIngredients = async () => {
        return await request(`${API_URL}/ingredients`);
    };

    return { getIngredients, process, setProcess }
}

export default useBurgerApi;
