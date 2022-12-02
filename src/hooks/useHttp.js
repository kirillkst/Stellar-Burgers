import { useState, useCallback } from "react";

import { checkResponse } from '../utils/burger-services';
import { PROCESS_STATE } from '../utils/constants';

const useHttp = () => {
    const [process, setProcess] = useState(PROCESS_STATE.WAITING);

    const request = useCallback(async (url) => { 
        setProcess(PROCESS_STATE.LOADING);   

        try {            
            const res = await fetch(url);
            const response = await checkResponse(res);          

            return response;
        } catch(error) {
            setProcess(PROCESS_STATE.ERROR);
            throw error;
        }
    }, []);

    return { request, process, setProcess }
}

export default useHttp;
