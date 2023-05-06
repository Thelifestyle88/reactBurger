import { TOrder } from '../../utils/typesData';
import { ADD_ORDER_DETAILS, DELETE_ORDER_DETAILS } from '../actions/getOrdersFeedDetails';
import { PayloadAction } from '@reduxjs/toolkit'

interface IOrdersFeedDetailState {
  order: TOrder | null
}

const initialState: IOrdersFeedDetailState = {
    order: null,
};

export function ordersFeedDetailsReducer(state = initialState, action: PayloadAction<TOrder>) {
  switch (action.type) {
    case ADD_ORDER_DETAILS: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case DELETE_ORDER_DETAILS: {
      return {
        ...state,
        order: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
