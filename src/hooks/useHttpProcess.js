import { useState, useCallback } from "react";
import useHttp from "./useHttp";
import { PROCESS_STATE } from '../utils/constants';

const useHttpProcess = () => {
    const [process, setProcess] = useState(PROCESS_STATE.WAITING);
    const { request } = useHttp();

    const sendRequest = useCallback(async (...data) => {   
        try {            
            return await request(...data);   
        } catch(error) {
            setProcess(PROCESS_STATE.ERROR);
            throw error;
        }
    }, []);

    return { sendRequest, process, setProcess }
}

export default useHttpProcess;
