import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import ingredients from './ingredientsSlice';
import cart from './cartSlice';
import order from './orderSlice';
import modal from './modalSlice';
import user from './userSlice';
import websocket from './socketSlice';
import { userAPI } from "../services/userAPI";
import { socketMiddleware } from './middleware/socket-middleware';
import { stringMiddleware } from './middleware/string-middleware';

import {     
    wsConnection,
    wsDisconnection,
    wsOpen,
    wsClose,
    wsMessage,
    wsError 
} from  './socketSlice';

const store = configureStore({
    reducer: { ingredients, cart, order, modal, user, websocket, [userAPI.reducerPath]: userAPI.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        stringMiddleware, 
        userAPI.middleware, 
        socketMiddleware({       
            connection: wsConnection,  
            disconnection: wsDisconnection,
            onOpen: wsOpen,
            onClose: wsClose,
            onError: wsError,
            onMessage: wsMessage,
        })
    ]),
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
