import { Dispatch } from 'react';
import { getIngredients } from '../../utils/api';

export const GET_BURGER_INGREDIENTS_REQUEST: 'GET_BURGER_INGREDIENTS_REQUEST' =
  'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCEED: 'GET_BURGER_INGREDIENTS_SUCCEED' = 'GET_BURGER_INGREDIENTS_SUCCEED';
export const GET_BURGER_INGREDIENTS_FAILED: 'GET_BURGER_INGREDIENTS_FAILED' = 'GET_BURGER_INGREDIENTS_FAILED';


export function getBurgerIngredients() {
  return function (dispatch:Dispatch<any>) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          console.log(res)
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCEED,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED,
          });
        }
      })
      .catch(console.error);
  };
}
