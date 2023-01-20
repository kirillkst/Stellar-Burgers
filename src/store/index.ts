import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import ingredients from './ingredientsSlice';
import cart from './cartSlice';
import order from './orderSlice';
import modal from './modalSlice';
import user from './userSlice';
import { userAPI } from "../services/userAPI";

const stringMiddleware = () => (next:any) => (action:any) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    
    return next(action);
};

const store = configureStore({
    reducer: { ingredients, cart, order, modal, user, [userAPI.reducerPath]: userAPI.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([stringMiddleware, userAPI.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
