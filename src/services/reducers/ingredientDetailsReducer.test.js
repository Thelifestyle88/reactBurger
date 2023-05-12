import { ingredientDetailsReducer, initialState } from './ingredientDetailsReducer';
import * as types from '../actions/getIngredientDetails';
import { testMain } from '../../utils/tests';

describe('ingredientDetailsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
  });
  it('ADD_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer(
        {},
        {
          type: types.ADD_INGREDIENT_DETAILS,
          payload: testMain,
        },
      ),
    ).toEqual({
      ingredient: testMain,
    });
  });
  it('DELETE_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer(
        {},
        {
          type: types.DELETE_INGREDIENT_DETAILS,
          payload: null,
        },
      ),
    ).toEqual({
      ingredient: null,
    });
  });
});
