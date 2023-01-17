import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import useHttp from "../hooks/useHttp";
import { API_URL, PROCESS_STATE } from "../utils/constants";

const initialState = {
    process: PROCESS_STATE.WAITING,
    auth: false,
    name: '',
    email: '',
    passReset: false
}

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

export const frogotPasswordRequest = createAsyncThunk(
    'user/frogotPassword',
    async (data, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/password-reset`, 'POST', JSON.stringify(data));  
        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);


export const resetPasswordRequest = createAsyncThunk(
    'user/resetPassword',
    async (data, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/password-reset/reset`, 'POST', JSON.stringify(data));  
        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);

export const logoutRequest = createAsyncThunk(
    'user/logout',
    async (data, thunkAPI) => {
        const { request } = useHttp();
        const res = await request(`${API_URL}/auth/logout`, 'POST', JSON.stringify(data));  
        return (res.success === true) ? res : thunkAPI.rejectWithValue();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {    
        setUser: (state, { payload }) => {
            state.auth = true;                
            state.name = payload.name;                
            state.email = payload.email;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(frogotPasswordRequest.fulfilled, state => { 
                state.passReset = true;                
                state.process = PROCESS_STATE.CONFIRMED;
            })
            .addCase(resetPasswordRequest.fulfilled, state => { 
                state.passReset = false;                
                state.process = PROCESS_STATE.CONFIRMED;
            })
            .addCase(logoutRequest.fulfilled, () => initialState)
            .addMatcher(
                isAnyOf(loginRequest.pending, registerRequest.pending, frogotPasswordRequest.pending, resetPasswordRequest.pending),
                (state, { payload }) => {
                    state.process = PROCESS_STATE.LOADING
                }
            )
            .addMatcher(
                isAnyOf(loginRequest.fulfilled, registerRequest.fulfilled ),
                (state, { payload }) => {
                    state.auth = true;                
                    state.name = payload.user.name;                
                    state.email = payload.user.email;
                    state.process = PROCESS_STATE.CONFIRMED;
                }
            )
            .addMatcher(
                isAnyOf(loginRequest.rejected, registerRequest.rejected, frogotPasswordRequest.rejected, resetPasswordRequest.rejected),
                (state, { payload }) => {
                    state.process = PROCESS_STATE.ERROR 
                }
            )
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = userSlice;

export const {
    setUser,
    resetUser,
    passReset
} = actions;

export default reducer;
