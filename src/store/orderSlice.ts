import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from "../hooks/useHttp";
import { getCookie } from '../services/cookie';
import { API_URL, PROCESS_STATE } from '../utils/constants';

export const initialState = {
    number: null,
    process: PROCESS_STATE.WAITING
}

type TCreatedOrder = {
    order: {
        number: number;
    }
}

export const createOrderRequest = createAsyncThunk<TCreatedOrder, Array<string>>(
    'order/request',
    async (ingredientsID) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/orders`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie('token'),
            },
            method: 'POST',
            body: JSON.stringify({ 
                "ingredients": ingredientsID
            }) 
        }) as Promise<any> as any; 

        return res;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {        
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderRequest.pending, (state:any) => { 
                state.process = PROCESS_STATE.LOADING
            })
            .addCase(createOrderRequest.fulfilled, (state:any, { payload }: any) => {
                state.number = payload.order.number;
                state.process = PROCESS_STATE.CONFIRMED;			
            })
            .addCase(createOrderRequest.rejected, (state:any) => { 
                state.process = PROCESS_STATE.ERROR 
            })
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = orderSlice;

export const {
} = actions;

export default reducer;
