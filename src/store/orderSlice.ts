import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from "../hooks/useHttp";
import { API_URL, PROCESS_STATE } from '../utils/constants';

const initialState = {
    number: null,
    process: PROCESS_STATE.WAITING
}

export const createOrderRequest = createAsyncThunk(
    'order/request',
    async (ingredientsID: Array<string>) => {
        const { request } = useHttp();
        return await request({
            url: `${API_URL}/orders`,
            method: 'POST',
            body: JSON.stringify({ 
                "ingredients": ingredientsID
            })
        })
    }
);

const orderSlice = createSlice({
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
