import { ingredientDetailsReducer, initialState } from './ingredientDetailsReducer';
import * as types from '../actions/getIngredientDetails';
import { testMain } from '../../utils/tests';

describe('ingredientDetailsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(ingredientDetailsReducer(null, {})).toEqual(initialState);
  });
  it('ADD_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: types.ADD_INGREDIENT_DETAILS,
        ingredient: testMain,
      }),
    ).toEqual({
      ingredient: testMain,
    });
  });
  it('DELETE_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: types.DELETE_INGREDIENT_DETAILS,
        ingredient: null,
      }),
    ).toEqual({
      ingredient: null,
    });
  });
});
