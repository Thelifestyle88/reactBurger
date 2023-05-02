import { PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../utils/typesData";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS,WS_GET_MESSAGE} from "../middleware/wsActionsType";

interface IGetAllOrdersState {
    ordersData: Array<TOrder>,
    getOrdersRequest: boolean,
    getOrdersFailed: boolean,
    getOrdersSuccess: boolean,
    wsConnect: boolean,
    error?: Event;
}

const initialState: IGetAllOrdersState = {
    ordersData: [],
    getOrdersRequest: false,
    getOrdersFailed: false,
    getOrdersSuccess: false,
    wsConnect: false
}

export function getAllOrderReducer(state=initialState, action:PayloadAction) {
 switch(action.type) {
    case WS_CONNECTION_START: {
        return {
            ...state,
            getOrdersRequest: true,
            getOrdersFailed: false,
            getOrdersSuccess: false,
            wsConnect:false
        }
    }
    case WS_CONNECTION_SUCCESS: {
        return {
            ...state,
            error: undefined,
            wsConnect: true,
            getOrdersRequest:false,
            getOrdersSuccess: false,
            getOrdersFailed: false,
        }
    }
    case WS_GET_MESSAGE: {
        return {
            ...state,
            error: undefined,
            wsConnect: true,
            ordersData: action.payload,
            getOrdersSuccess: true,
        }
    }
    case WS_CONNECTION_CLOSED: {
        return {
            ...state, 
            error: undefined,
            wsConnect: false,
        }
    }
    case WS_CONNECTION_ERROR: {
        return {
            ...state, 
            error: action.payload,
            wsConnect: false,
            getOrdersFailed: false,
        }
    }
    default: {
        return state;
    }
}
}