import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import useHttp from "../hooks/useHttp";
import { API_URL, PROCESS_STATE } from '../utils/constants';

const initialState = {
    auth: false,
    name: null,
    email: null,
    process: PROCESS_STATE.WAITING
}

export const getUserRequest = createAsyncThunk(
    'user/get',
    async (token, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/auth/user`, 'GET', null, {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }, 
            {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }       
        );  

        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);

export const updateTokenRequest = createAsyncThunk(
    'user/updateToken',
    async (data, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/auth/token`, 'POST', JSON.stringify(data));  
        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);

export const loginRequest = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/auth/login`, 'POST', JSON.stringify(data));  
        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);

export const registerRequest = createAsyncThunk(
    'user/register',
    async (data, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/auth/register`, 'POST', JSON.stringify(data));  
        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {       
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(loginRequest.pending, registerRequest.pending, getUserRequest.pending),
                (state, { payload }) => {
                    state.process = PROCESS_STATE.LOADING
                }
            )
            .addMatcher(
                isAnyOf(loginRequest.fulfilled, registerRequest.fulfilled, getUserRequest.fulfilled),
                (state, { payload }) => {
                    state.auth = true;                
                    state.name = payload.user.name;                
                    state.email = payload.user.email;
                    state.process = PROCESS_STATE.CONFIRMED;
                }
            )
            .addMatcher(
                isAnyOf(loginRequest.rejected, registerRequest.rejected, getUserRequest.rejected),
                (state, { payload }) => {
                    state.process = PROCESS_STATE.ERROR 
                }
            )
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = userSlice;

export const {
} = actions;

export default reducer;
