import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    modal: null,
    data: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {        
        openModal: (state, { payload }) => {
            state.modal = payload.modal;
            state.data = payload.data;
        },
        closeModal: () => initialState
    }
});

const { actions, reducer } = modalSlice;

export const {
    openModal,
    closeModal
} = actions;

export default reducer;
