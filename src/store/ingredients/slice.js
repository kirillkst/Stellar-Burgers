import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import useHttp from "../../hooks/useHttp";
import { API_URL, PROCESS_STATE } from '../../utils/constants';


const ingredientsAdapter = createEntityAdapter({
    selectId: (item) => item._id,
});

const initialState = ingredientsAdapter.getInitialState({
    process: PROCESS_STATE.WAITING
});


export const ingredientsRequest = createAsyncThunk(
    'ingredients/request',
    async (thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/ingredients`);
        return (res.success === true && Array.isArray(res.data)) ? res.data : thunkAPI.rejectWithValue();
    }
);


const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {        
        changeCounter: {
            reducer: (state, action) => {
                //state.push(action.payload)
            },
            prepare: (text) => {
                //const id = nanoid()
                //return { payload: { id, text } }
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ingredientsRequest.pending, state => { 
                state.process = PROCESS_STATE.LOADING
            })
            .addCase(ingredientsRequest.fulfilled, (state, action) => {
                ingredientsAdapter.setAll(state, action.payload);
                state.process = PROCESS_STATE.CONFIRMED;			
            })
            .addCase(ingredientsRequest.rejected, state => { 
                state.process = PROCESS_STATE.ERROR 
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = ingredientsSlice;

export const ingredientsSelectors = ingredientsAdapter.getSelectors(store => store.ingredients);
export const {
    changeCounter
} = actions;

export default reducer;
