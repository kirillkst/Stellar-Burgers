import reducer, {
    cartSlice,
    initialState,
    addToCart,
    reset
} from '../store/cartSlice';


const ingredient = {
    calories: 1,
    carbohydrates: 1,
    fat: 1,
    image: 'imageURL',
    image_large: 'imageURL',
    image_mobile: 'imageURL',
    name: 'name',
    price: 1000,
    proteins: 1,
    type: 'bun',
    __v: 0,
    _id: '1',
}

describe('userSlice', () => {

    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('should handle addToCart', () => {
        const nextState = cartSlice.reducer(initialState, addToCart(ingredient));
        expect(nextState.bun).toEqual(expect.objectContaining(ingredient));
        expect(nextState.total).toEqual(2000);
    });

    test('should handle reset', () => {
        const nextState = cartSlice.reducer(initialState, reset());
        expect(nextState).toEqual(initialState);
    });

});
