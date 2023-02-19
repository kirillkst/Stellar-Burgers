import reducer, { initialState, orderSlice } from "../store/orderSlice";

describe('orderSlice', () => {

    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('should handle createOrderRequest', () => {
        const nextState = orderSlice.reducer(initialState, {
            type: 'order/request/fulfilled',
            payload: {
                order: {
                    number: 123
                }
            }
        });
        expect(nextState.number).toEqual(123);
        expect(nextState.process).toEqual('confirmed');
    });   

});
