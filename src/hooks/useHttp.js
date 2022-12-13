import { useCallback } from "react";
import { checkResponse } from '../utils/burger-utils';


const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {       
        try {           
            const res = await fetch(url, { method, body, headers });
            return await checkResponse(res);   
        } catch(error) {
            throw error;
        }
    }, []);

    return { request }
}

export default useHttp;
