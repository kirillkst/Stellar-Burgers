import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    active: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {        
        openModal: (state, { payload }) => {
            state.active = payload;
        },
        closeModal: (state) => {
            state.active = null;
        }
    }
});

const { actions, reducer } = modalSlice;

export const {
    openModal,
    closeModal
} = actions;

export default reducer;
