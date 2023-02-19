import reducer, { initialState, ingredientsSlice } from "../store/ingredientsSlice";

const ingredient = {
    _id: '1',
}

describe('ingredientsSlice', () => {

    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('should handle ingredientsRequest', () => {
        const nextState = ingredientsSlice.reducer(initialState, {
            type: 'ingredients/request/fulfilled',
            payload: [ingredient]
        });
        expect(nextState).toEqual({"entities": {"1": {"_id": "1"}}, "ids": ["1"], "process": "confirmed"});
    });   

});
