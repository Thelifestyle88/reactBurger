import { burgerConstructorReducer, initialState } from './burgerConstructorReducer';
import * as types from '../actions/getBurgerConstructor';
import { testBun, testSauce, testMain } from '../../utils/tests';

describe('burgerConstructorReducer', () => {
  it('должен вернуть initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_BUN', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_BUN,
        buns: testBun,
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
        burgerConstructorData: [...initialState.burgerConstructorData, testMain],
      }),
    ).toEqual({
      ...initialState,
      burgerConstructorData: [...initialState.burgerConstructorData, testMain],
    });
  });
  it('should handle DELETE_POSITION', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.DELETE_POSITION,
        burgerConstructorData: [
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
