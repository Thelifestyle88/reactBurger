import { Dispatch } from 'react';
import { getIngredients } from '../../utils/api';
export const GET_ALL_ORDERS_REQUEST: 'GET_ALL_ORDERS_REQUEST' =
  'GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_SUCCEED: 'GET_ALL_ORDERS_SUCCEED' = 'GET_ALL_ORDERS_SUCCEED';
export const GET_ALL_ORDERS_FAILED: 'GET_ALL_ORDERS_FAILED' = 'GET_ALL_ORDERS_FAILED';


export function getAllOrdersData() {
  return function (dispatch:Dispatch<any>) {
    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        if (res && res.success) {
            console.log(res)
          dispatch({
            type: GET_ALL_ORDERS_SUCCEED,
            payload: res.orders,
          });
        } else {
          dispatch({
            type: GET_ALL_ORDERS_FAILED,
          });
        }
      })
      .catch(console.error);
  };
}
