import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { INGREDIENTS_TYPES } from '../utils/constants';

const cartIngredientsAdapter = createEntityAdapter();

const initialState = {
    bun: null,
    ingredients: cartIngredientsAdapter.getInitialState(), 
    total: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {        
        addToCart: {
            reducer: (state, { payload }) => {
                if ( payload.type === INGREDIENTS_TYPES.BUN.key ) {
                     state.bun = payload;
                } else {
                    cartIngredientsAdapter.addOne(state.ingredients, payload);
                }                          
            },
            prepare: (ingredient) => {
                const id = nanoid();
                return { payload: { id: id, ...ingredient } }
            }
        },
        removeFromCart: (state, { payload }) => {
            cartIngredientsAdapter.removeOne(state.ingredients, payload);
        },
        moveIngredient: (state, { payload }) => {
            const ingredients = cartIngredientsAdapter.getSelectors(state => state.ingredients).selectAll(state);
            const dragElement = ingredients[payload.dragIndex];
            const hoverElement = ingredients[payload.hoverIndex];   

            ingredients[payload.dragIndex] = hoverElement;
            ingredients[payload.hoverIndex] = dragElement;

            cartIngredientsAdapter.setAll(state.ingredients, ingredients);
        },
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder       
            .addMatcher(
                (action) => ['cart/addToCart', 'cart/removeFromCart', 'cart/reset'].includes(action.type),
                (state, action) => {       
                    const ingredients = cartIngredientsAdapter.getSelectors(state => state.ingredients).selectAll(state);
                    const bunPrice = state.bun?.price * 2 || 0;
                    state.total = (ingredients.length > 0) ? ingredients.reduce((acc, el) => acc + el.price, bunPrice) : bunPrice;
                }
            )
            .addDefaultCase(() => {})
      },
});

const { actions, reducer } = cartSlice;

export const cartIngredientsSelectors = cartIngredientsAdapter.getSelectors(store => store.cart.ingredients);

export const {
    addToCart,
    removeFromCart,
    moveIngredient,
    reset
} = actions;

export default reducer;
