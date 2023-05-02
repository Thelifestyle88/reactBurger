import type { Middleware, MiddlewareAPI } from 'redux';
import { RootState, AppDispatch } from '../..';
import { PayloadAction } from '@reduxjs/toolkit';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null
        return next => (action: PayloadAction) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if(type === 'WS_CONNECTION_START') {
                socket = new WebSocket(wsUrl);
            }
            if(socket) {
                socket.onopen = event => {
                    dispatch({type: 'WS_CONNECTION_SUCCESS', payload: event})
                }
                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                  };
                  socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: 'WS_GET_MESSAGE', payload: data });
                  };
                  socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                  };
            }
            next(action);
        }
    })
}
