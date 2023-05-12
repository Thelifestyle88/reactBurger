import { burgerConstructorReducer, initialState } from './burgerConstructorReducer';
import * as types from '../actions/getBurgerConstructor';
import { testBun, testMain } from '../../utils/tests';

describe('burgerConstructorReducer', () => {
  it('должен вернуть initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_BUN', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_BUN,
        payload: testBun,
      }),
    ).toEqual({
      ...initialState,
      buns: testBun,
    });
  });
  it('should handle ADD_POSITION', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_POSITION,
        payload: [...initialState.burgerConstructorData, testMain],
      }),
    ).toEqual({
      ...initialState,
      payload: [...initialState.burgerConstructorData, testMain],
    });
  });
  it('should handle DELETE_POSITION', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.DELETE_POSITION,
        payload: [
          ...initialState.burgerConstructorData.slice(0, testMain),
          ...initialState.burgerConstructorData.slice(testMain + 1),
        ],
      }),
    ).toEqual({
      ...initialState,
      burgerConstructorData: [
        ...initialState.burgerConstructorData.slice(0, testMain),
        ...initialState.burgerConstructorData.slice(testMain + 1),
      ],
    });
  });
});
