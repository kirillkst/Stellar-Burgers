import useHttpProcess from './useHttpProcess';
import { API_URL } from '../utils/constants';
import { TIngredientId } from '../utils/types';


const useBurgerApi = () => {
    const { sendRequest, process, setProcess } = useHttpProcess();

    const getIngredients = async () => {
        return await sendRequest({
            url: `${API_URL}/ingredients`
        });
    };

    const createOrder = async (ingredientsID: Array<TIngredientId>)  => {
        return await sendRequest({
            url: `${API_URL}/orders`,
            method: 'POST',
            body: JSON.stringify({ 
                "ingredients": ingredientsID
            })
        });
    };   
    
    const getOrder = async (orderNumber: number)  => {
        return await sendRequest({
            url: `${API_URL}/orders/${orderNumber}`
        });
    };    

    return { getIngredients, createOrder, getOrder, process, setProcess }
}

export default useBurgerApi;
