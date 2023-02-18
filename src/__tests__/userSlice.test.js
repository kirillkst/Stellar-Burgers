import reducer, {
    userSlice,
    initialState,
    setUser,
} from '../store/userSlice';


describe('userSlice', () => {

    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('should handle setUser', () => {
        const nextState = userSlice.reducer(initialState, setUser({
            auth: true,
            name: 'name',
            email: 'email',
        }));
        expect(nextState.auth).toEqual(true);
        expect(nextState.name).toEqual('name');
        expect(nextState.email).toEqual('email');
    });

    test('should handle loginRequest', () => {
        const nextState = userSlice.reducer(initialState, {
            type: 'user/login/fulfilled',
            payload: {
                user: {
                    name: 'name',
                    email: 'email',
                }
            }
        });
        expect(nextState.auth).toEqual(true);
        expect(nextState.name).toEqual('name');
        expect(nextState.email).toEqual('email');
        expect(nextState.process).toEqual('confirmed');
    });

    test('should handle registerRequest', () => {
        const nextState = userSlice.reducer(initialState, {
            type: 'user/register/fulfilled',
            payload: {
                user: {
                    name: 'name',
                    email: 'email',
                }
            }
        });
        expect(nextState.auth).toEqual(true);
        expect(nextState.name).toEqual('name');
        expect(nextState.email).toEqual('email');
        expect(nextState.process).toEqual('confirmed');
    });

    test('should handle logoutRequest', () => {
        const nextState = userSlice.reducer(initialState, {
            type: 'user/logout/fulfilled',
        });
        expect(nextState).toEqual(initialState);
    });

    test('should handle frogotPasswordRequest', () => {
        const nextState = userSlice.reducer(initialState, {
            type: 'user/frogotPassword/fulfilled',
        });
        expect(nextState.passReset).toEqual(true);
        expect(nextState.process).toEqual('confirmed');
    });

    test('should handle resetPasswordRequest', () => {
        const nextState = userSlice.reducer(initialState, {
            type: 'user/resetPassword/fulfilled',
        });
        expect(nextState.passReset).toEqual(false);
        expect(nextState.process).toEqual('confirmed');
    });

});
