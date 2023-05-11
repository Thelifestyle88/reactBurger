import { TOrder } from "../../utils/typesData";

export const ADD_ORDER_DETAILS: 'ADD_ORDER_DETAILS' = 'ADD_ORDER_DETAILS';
export const DELETE_ORDER_DETAILS: 'DELETE_ORDER_DETAILS' = 'DELETE_ORDER_DETAILS';

export const addOrderFeedDetails = (order:TOrder) => {
  return {
    type: ADD_ORDER_DETAILS,
    payload: {
      ...order,
    },
  };
};

export const deleteOrderFeedDetails = () => {
  return {
    type: DELETE_ORDER_DETAILS,
    payload: null,
  };
};
