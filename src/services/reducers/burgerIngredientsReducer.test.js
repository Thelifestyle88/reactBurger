import { burgerIngredientReducer, initialState } from './burgerIngredientsReducer';
import { testBun, testSauce, testMain } from '../../utils/tests';
import * as types from '../actions/getBurgerIngredients';

describe('burgerIngredientReducer', () => {
  it('должен вернуть initial state', () => {
    expect(burgerIngredientReducer(initialState, {})).toEqual(initialState);
  });
  it('GET_BURGER_INGREDIENTS_REQUEST', () => {
    expect(
      burgerIngredientReducer(initialState, {
        type: types.GET_BURGER_INGREDIENTS_REQUEST,
        burgerIngredientRequest: true,
        isPageOnLoad: true,
      }),
    ).toEqual({
      ...initialState,
      isPageOnLoad: true,
      urgerIngredientRequest: true,
    });
  });
  it('GET_BURGER_INGREDIENTS_SUCCEED', () => {
    expect(
      burgerIngredientReducer(initialState, {
        type: types.GET_BURGER_INGREDIENTS_SUCCEED,
        burgerIngredientData: [testBun, testMain, testSauce],
      }),
    ).toEqual({
      ...initialState,
      burgerIngredientData: [testBun, testMain, testSauce],
    });
  });
  it('GET_BURGER_INGREDIENTS_FAILED', () => {
    expect(
      burgerIngredientReducer(initialState, {
        type: types.GET_BURGER_INGREDIENTS_FAILED,
        burgerIngredientFailed: true,
      }),
    ).toEqual({
      ...initialState,
      burgerIngredientFailed: true,
    });
  });
});
