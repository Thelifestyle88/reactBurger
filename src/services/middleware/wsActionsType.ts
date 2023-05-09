import { createAction } from "@reduxjs/toolkit";
import { TAllOrders } from "../../utils/typesData";

export const wsConnection = createAction<string>('WS_CONNECTION_START')
export const wsConnectionConnect = createAction('WS_CONNECTION_CONNECT')
export const wsConnectionError = createAction('WS_CONNECTION_ERROR')
export const wcConnectionClosed = createAction<string>('WS_CONNECTION_CLOSED')
export const wsGetMessage = createAction<TAllOrders>('WS_GET_MESSAGE')
export const wsOpen = createAction('WS_CONNECTION_OPEN')


export interface TwsActions {
    wcConnectionClosed: typeof wcConnectionClosed;
    wsConnection: typeof wsConnection;
    wsConnectionError: typeof wsConnectionError;
    wsConnectionConnect: typeof wsConnectionConnect;
    wsGetMessage: typeof wsGetMessage;
  }