import useHttpProcess from './useHttpProcess';
import { API_URL } from '../utils/constants';


const useBurgerApi = () => {
    const { sendRequest, process, setProcess } = useHttpProcess();

    const getIngredients = async () => {
        return await sendRequest(`${API_URL}/ingredients`);
    };

    const createOrder = async (ingredientsID) => {
        return await sendRequest(`${API_URL}/orders`, 'POST', JSON.stringify({ 
            "ingredients": ingredientsID
        }));
    };    

    return { getIngredients, createOrder, process, setProcess }
}

export default useBurgerApi;
