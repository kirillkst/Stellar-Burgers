import { INITIAL_CART, INGREDIENTS_TYPES } from './constants';

export function cartReducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case 'add':
			const data = payload.data;
			
			return (payload.type === INGREDIENTS_TYPES.BUN.key)
				? { ...state, bun: data }
				: { ...state, ingredients: [...state.ingredients, data] } 

		case 'total':
			let total = state.bun?.price || 0;
			total += (state.ingredients.length > 0) ? state.ingredients.reduce((acc, el) => acc + el.price, 2 * total) : 0;

			return { ...state, cartTotal: total }
		
		case 'reset':
			return INITIAL_CART;

		default:
			throw new Error();
	}
}
