import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: false,
    name: '',
    email: '',
    passReset: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {    
        setUser: (state, { payload }) => {
            state.auth = true;                
            state.name = payload.name;                
            state.email = payload.email;
        },
        passReset: (state) => {
            state.passReset = true
        },
        resetUser: () => initialState
    }
});

const { actions, reducer } = userSlice;

export const {
    setUser,
    resetUser,
    passReset
} = actions;

export default reducer;
