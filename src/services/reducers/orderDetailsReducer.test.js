import { orderDetailsReducer, initialState } from './orderDetailsReducer';
import * as types from '../actions/getOrderDetails';
import { testOrderDetails } from '../../utils/tests';

describe('orderDetailsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(orderDetailsReducer(initialState, {})).toEqual(initialState);
  });
  it('GET_ORDER_REQUEST', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_REQUEST,
        orderDetailsRequest: true,
        isPageOnLoad: true,
      }),
    ).toEqual({
      ...initialState,
      isPageOnLoad: true,
      urgerIngredientRequest: true,
    });
  });
  it('GET_ORDER_SUCCEED', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_SUCCEED,
        orderDetails: testOrderDetails,
      }),
    ).toEqual({
      ...initialState,
      burgerIngredientData: testOrderDetails,
    });
  });
  it('GET_ORDER_FAILED', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_FAILED,
        orderDetailsFailed: true,
      }),
    ).toEqual({
      ...initialState,
      orderDetailsFailed: true,
    });
  });
});
