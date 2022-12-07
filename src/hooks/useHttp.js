import { useState, useCallback } from "react";

import { checkResponse } from '../utils/burger-utils';
import { PROCESS_STATE } from '../utils/constants';

const useHttp = () => {
    const [process, setProcess] = useState(PROCESS_STATE.WAITING);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => { 
        setProcess(PROCESS_STATE.LOADING);   

        try {            
            const res = await fetch(url, { method, body, headers });
            return await checkResponse(res);   
        } catch(error) {
            setProcess(PROCESS_STATE.ERROR);
            throw error;
        }
    }, []);

    return { request, process, setProcess }
}

export default useHttp;
