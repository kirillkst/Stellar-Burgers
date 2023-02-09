export const INGREDIENTS_TYPES = Object.freeze({
    BUN: {
        key: "bun",
        name: "Булки"
    },
    SAUCE: {
        key: "sauce",
        name: "Соусы"
    },
    MAIN: {
        key: "main",
        name: "Начинки"
    }
});

export const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_URL = 'wss://norma.nomoreparties.space';

export const PROCESS_STATE = Object.freeze({
    WAITING: 'waiting',
    LOADING: 'loading',
    CONFIRMED: 'confirmed',
    ERROR: 'error'
});

export const INITIAL_CART = { 
    bun: null, 
    ingredients: [], 
    cartTotal: 0 
};

export const ESC_KEYCODE = 27;

export const MODAL_ROOT = document.getElementById('react-modals');

export const MODAL = {
    INGREDIENTS_DETAILS: 'ingredients details',
    ORDER_DETAILS: 'order details'
}
