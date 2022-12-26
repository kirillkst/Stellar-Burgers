import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modal: null,
    data: null
}

const modalSlice = createSlice({
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
