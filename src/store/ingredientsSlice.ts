import { createSlice, createEntityAdapter, createAsyncThunk, EntityState } from '@reduxjs/toolkit';
import useHttp from "../hooks/useHttp";
import { API_URL, PROCESS_STATE } from '../utils/constants';
import { TIngredient, TSuccessIngredients, TThunkAPI } from '../utils/types';

const ingredientsAdapter = createEntityAdapter<TIngredient>({
    selectId: (item:TIngredient) => item._id,
});

export const initialState = ingredientsAdapter.getInitialState({
    process: PROCESS_STATE.WAITING
});

export const ingredientsRequest = createAsyncThunk<TSuccessIngredients, void, TThunkAPI>(
    'ingredients/request',
    async (_, thunkAPI) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/ingredients`
        }) as Promise<any> as any;
        return (res.success === true && Array.isArray(res.data)) ? res.data : thunkAPI.rejectWithValue(res);        
    }
);

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {        
    },
    extraReducers: (builder) => {
        builder
            .addCase(ingredientsRequest.pending, (state:any) => { 
                state.process = PROCESS_STATE.LOADING
            })
            .addCase(ingredientsRequest.fulfilled, (state:any, { payload }: any ) => {
                ingredientsAdapter.setAll(state, payload);
                state.process = PROCESS_STATE.CONFIRMED;			
            })
            .addCase(ingredientsRequest.rejected, (state:any) => { 
                state.process = PROCESS_STATE.ERROR 
            })
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = ingredientsSlice;

export const ingredientsSelectors = ingredientsAdapter.getSelectors((store:any) => store.ingredients);
export const {
} = actions;

export default reducer;
