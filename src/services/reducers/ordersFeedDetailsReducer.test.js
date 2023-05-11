import { ordersFeedDetailsReducer, initialState } from './ordersFeedDetailsReducer';
import * as types from '../actions/getOrdersFeedDetails';

describe('orderDetailsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(ordersFeedDetailsReducer(undefined, {})).toEqual(initialState);
  });
  it('GET_BURGER_INGREDIENTS_REQUEST', () => {
    expect(
      ordersFeedDetailsReducer(initialState, {
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
      ordersFeedDetailsReducer(initialState, {
        type: types.ADD_ORDER_DETAILS,
        burgerIngredientData: [],
      }),
    ).toEqual({
      ...initialState,
      burgerIngredientData: [],
    });
  });
});
