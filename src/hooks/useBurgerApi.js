import { API_URL } from '../utils/constants';

import useHttp from './useHttp';

const useBurgerApi = () => {
    const {request, process, setProcess} = useHttp();

    const getIngredients = async () => {
        return await request(`${API_URL}/ingredients`);
    };

    const createOrder = async (ingredientsID) => {
        return await request(`${API_URL}/orders`, 'POST', JSON.stringify({ 
            "ingredients": ingredientsID
        }));
    };    

    return { getIngredients, createOrder, process, setProcess }
}

export default useBurgerApi;
