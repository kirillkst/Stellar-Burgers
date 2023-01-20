import { useState, useCallback } from "react";
import useHttp from "./useHttp";
import { PROCESS_STATE } from '../utils/constants';
import { TRequest } from "../utils/types";

const useHttpProcess = () => {
    const [process, setProcess] = useState<typeof PROCESS_STATE[keyof typeof PROCESS_STATE]>(PROCESS_STATE.WAITING);
    const { request } = useHttp();

    const sendRequest = useCallback(async (data: TRequest) => {   
        try {            
            return await request(data);   
        } catch(error) {
            setProcess(PROCESS_STATE.ERROR);
            throw error;
        }
    }, []);

    return { sendRequest, process, setProcess }
}

export default useHttpProcess;
