import { createReducer } from "@reduxjs/toolkit";
import { TAllOrders } from "../../utils/typesData";
import { WebsocketStatus } from "../constants";
import {
    wcConnectionClosed,
    wsConnection,
    wsConnectionError,
    wsConnectionConnect,
    wsGetMessage,
  } from '../middleware/wsActionsType';

interface IGetAllOrdersState {
    orders: TAllOrders,
    status: string,
    connectionError: string | undefined
}

const initialState: IGetAllOrdersState = {
    orders: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    status: WebsocketStatus.OFFLINE,
    connectionError: ''
}

export const getAllOrderReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(wsConnection, (state) => {
        state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsConnectionConnect, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = ' ';
    })
    .addCase(wcConnectionClosed, (state) => {
        state.status = WebsocketStatus.OFFLINE
        
    })
    .addCase(wsConnectionError, (state, action) => {
        state.connectionError = action.payload
        
    })
    .addCase(wsGetMessage, (state, action) => {
        state.orders = action.payload
        
    })
})