import { TIngredient, TOrder } from '../../utils/typesData';
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCEED,
  DELETE_ORDER_DETAILS,
} from '../actions/getOrderDetails';
import { PayloadAction } from '@reduxjs/toolkit'

interface IOrderDetailsState {
  orderDetails: TOrder | null
  orderDetailsRequest: boolean,
  orderDetailsFailed: boolean,
  isPageOnLoad: boolean,
}

const initialState: IOrderDetailsState = {
  orderDetails: null,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  isPageOnLoad: false,
};

export function orderDetailsReducer(state = initialState, action: PayloadAction<TOrder>) {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
        isPageOnLoad: true,
      };
    }
    case GET_ORDER_SUCCEED: {
      return {
        ...state,
        orderDetails: action.payload,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        isPageOnLoad: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: true,
        isPageOnLoad: false,
      };
    }
    case DELETE_ORDER_DETAILS: {
      return {
        ...state,
        orderDetails: null,
      };
    }
    default: {
      return state;
    }
  }
}
