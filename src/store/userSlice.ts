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
    async (data:any, thunkAPI) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/auth/login`,
            method: 'POST',
            body: JSON.stringify(data)
        }) as Promise<any> as any;  
        return (res.success === true) ? res : thunkAPI.rejectWithValue(res);
    }
);

export const registerRequest = createAsyncThunk(
    'user/register',
    async (data:any, thunkAPI) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/auth/register`,
            method: 'POST',
            body: JSON.stringify(data)
        }) as Promise<any> as any;  
        return (res.success === true) ? res : thunkAPI.rejectWithValue(res);
    }
);

export const frogotPasswordRequest = createAsyncThunk(
    'user/frogotPassword',
    async (data:any, thunkAPI) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/auth/password-reset`,
            method: 'POST',
            body: JSON.stringify(data)
        }) as Promise<any> as any;  
        return (res.success === true) ? res : thunkAPI.rejectWithValue(res);
    }
);


export const resetPasswordRequest = createAsyncThunk(
    'user/resetPassword',
    async (data:any, thunkAPI) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/password-reset/reset`,
            method: 'POST',
            body: JSON.stringify(data)
        }) as Promise<any> as any;  
        return (res.success === true) ? res : thunkAPI.rejectWithValue(res);
    }
);

export const logoutRequest = createAsyncThunk(
    'user/logout',
    async (data:any, thunkAPI) => {
        const { request } = useHttp();
        const res = await request({
            url: `${API_URL}/auth/logout`,
            method: 'POST',
            body: JSON.stringify(data)
        }) as Promise<any> as any;  
        return (res.success === true) ? res : thunkAPI.rejectWithValue(res);
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
            .addCase(frogotPasswordRequest.fulfilled, (state:any) => { 
                state.passReset = true;                
                state.process = PROCESS_STATE.CONFIRMED;
            })
            .addCase(resetPasswordRequest.fulfilled,  (state:any) => { 
                state.passReset = false;                
                state.process = PROCESS_STATE.CONFIRMED;
            })
            .addCase(logoutRequest.fulfilled, () => initialState)
            .addMatcher(
                isAnyOf(loginRequest.pending, registerRequest.pending, frogotPasswordRequest.pending, resetPasswordRequest.pending),
                (state:any, { payload }) => {
                    state.process = PROCESS_STATE.LOADING
                }
            )
            .addMatcher(
                isAnyOf(loginRequest.fulfilled, registerRequest.fulfilled ),
                (state:any, { payload }) => {
                    state.auth = true;                
                    state.name = payload.user.name;                
                    state.email = payload.user.email;
                    state.process = PROCESS_STATE.CONFIRMED;
                }
            )
            .addMatcher(
                isAnyOf(loginRequest.rejected, registerRequest.rejected, frogotPasswordRequest.rejected, resetPasswordRequest.rejected),
                (state:any, { payload }) => {
                    state.process = PROCESS_STATE.ERROR 
                }
            )
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = userSlice;

export const {
    setUser,
} = actions;

export default reducer;
