import { createAction } from "@reduxjs/toolkit";
import { TAllOrders } from "../../utils/typesData";

export const wsConnection = createAction('WS_CONNECTION_START')
export const wsConnectionConnect = createAction('WS_CONNECTION_CONNECT')
export const wsConnectionError = createAction('WS_CONNECTION_ERROR')
export const wcConnectionClosed = createAction('WS_CONNECTION_CLOSED')
export const wsGetMessage = createAction<TAllOrders>('WS_GET_MESSAGE')
export const wsOpen = createAction('WS_CONNECTION_OPEN')


export type TwsActions = {
    wcConnectionClosed: typeof wcConnectionClosed;
    wsConnection: typeof wsConnection;
    wsConnectionError: typeof wsConnectionError;
    wsConnectionConnect: typeof wsConnectionConnect;
    wsGetMessage: typeof wsGetMessage;
  }