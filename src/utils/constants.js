export const INGREDIENTS_TYPES = [
    {
        key: "bun",
        name: "Булки"
    },
    {
        key: "sauce",
        name: "Соусы"
    },
    {
        key: "main",
        name: "Начинки"
    }
];

export const API_URL = 'https://norma.nomoreparties.space/api';

export const PROCESS_STATE = Object.freeze({
    WAITING: 'waiting',
    LOADING: 'loading',
    CONFIRMED: 'confirmed',
    ERROR: 'error'
})

export const ESC_KEYCODE = 27;

export const MODAL_ROOT = document.getElementById('react-modals');
