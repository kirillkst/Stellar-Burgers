import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
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

type TAppActions = any;

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>
export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TAppActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
