import { checkResponse } from '../utils/burger-utils';
import { TRequest } from '../utils/types';


const useHttp = () => {
    const request = async ({
        url = '', 
        method = 'GET', 
        body = null, 
        headers = { 'Content-Type': 'application/json' }, 
        additional = {}     
    } : TRequest) => {       
        try {
            const res = await fetch(url, { method, body, headers, ...additional });     
            return await checkResponse(res);   
        } catch(error) {
            throw error;
        }
    };

    return { request }
}

export default useHttp;
