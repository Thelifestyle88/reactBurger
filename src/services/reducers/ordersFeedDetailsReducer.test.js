import { ordersFeedDetailsReducer, initialState } from './ordersFeedDetailsReducer';
import * as types from '../actions/getOrdersFeedDetails';
import { testOrder } from '../../utils/tests';

describe('orderDetailsReducer', () => {
  it('должен вернуть initial state', () => {
    expect(ordersFeedDetailsReducer(undefined, {})).toEqual(initialState);
  });
  it('ADD_ORDER_DETAILS', () => {
    expect(
      ordersFeedDetailsReducer(initialState, {
        type: types.ADD_ORDER_DETAILS,
        payload: testOrder,
      }),
    ).toEqual({
      order: testOrder,
    });
  });
  it('DELETE_ORDER_DETAILS', () => {
    expect(
      ordersFeedDetailsReducer(initialState, {
        type: types.DELETE_ORDER_DETAILS,
        payload: null,
      }),
    ).toEqual({
      order: null,
    });
  });
});
