import reducer, { modalSlice, initialState, openModal, closeModal } from '../store/modalSlice';

describe('modalSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should open modal', () => {
    const nextState = modalSlice.reducer(initialState, openModal({
        modal: 'modal',
        data: 'data'
    }));
    expect(nextState.modal).toEqual('modal');
    expect(nextState.data).toEqual('data');
  });

  test('should close modal', () => {
    const nextState = modalSlice.reducer(initialState, closeModal());
    expect(nextState).toEqual(initialState);
  });
});
