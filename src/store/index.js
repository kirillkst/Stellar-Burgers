import { configureStore } from "@reduxjs/toolkit";
import ingredients from './ingredientsSlice';
import cart from './cartSlice';
import order from './orderSlice';
import modal from './modalSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    
    return next(action);
};

const store = configureStore({
    reducer: { ingredients, cart, order, modal },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
