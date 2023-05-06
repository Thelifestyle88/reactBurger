import type { Middleware, MiddlewareAPI } from 'redux';
import { RootState, AppDispatch } from '../..';
import { PayloadAction } from '@reduxjs/toolkit';
import { TAllOrders, TOrder } from '../../utils/typesData';

//@ts-ignore
export const socketMiddleware = (wsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null
        return next => (action: PayloadAction<TAllOrders>) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { 
                wcConnectionClosed,
                wsConnection,
                wsConnectionError,
                wsConnectionConnect,
                wsGetMessage } = wsActions
            if(type === wsConnection.type) {
                socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');
            }
            if(socket) {
                socket.onopen = event => {
                    dispatch(wsConnectionConnect())
                }
                socket.onerror = event => {
                    dispatch(wsConnectionError(event));
                  };
                  socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data)
                    dispatch(wsGetMessage(parsedData));
                  };
                  socket.onclose = event => {
                    dispatch(wcConnectionClosed());
                  };
            }
            next(action);
        }
    })
}
