import { sendOrder } from '../../utils/api';
import { AppDispatch } from '../..';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCEED: 'GET_ORDER_SUCCEED' = 'GET_ORDER_SUCCEED';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const DELETE_ORDER_DETAILS: 'DELETE_ORDER_DETAILS' = 'DELETE_ORDER_DETAILS';

export function getOrderDetails(ingredients:(string | undefined)[]) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    sendOrder(ingredients)
      .then((res) => {
        console.log(res)
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCEED,
            payload: res,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch(console.error);
  };
}

export const deleteOrderDetails = () => {
  return {
    type: DELETE_ORDER_DETAILS,
    payload: null,
  };
};
