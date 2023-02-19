import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCEED, DELETE_ORDER_DETAILS } from "../actions/getOrderDetails";

const initialState = {
    orderDetails: null,
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    isPageOnLoad: false
}

export function orderDetailsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderDetailsRequest: true,
                isPageOnLoad: true
            }
        }
        case GET_ORDER_SUCCEED: {
            return {
                ...state,
                orderDetails: action.orderDetails,
                orderDetailsRequest: false,
                orderDetailsFailed: false,
                isPageOnLoad: false
    
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: true,
                isPageOnLoad: false
            }
        }
        case DELETE_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: null
            }
        }
        default: {
            return state
        }
    }
    }