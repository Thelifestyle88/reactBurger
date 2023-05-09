import type { Middleware, MiddlewareAPI } from 'redux';
import { RootState, AppDispatch } from '../..';

//@ts-ignore
export const socketMiddleware = (wsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null
        let wsUrl = ''
        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { 
                wcConnectionClosed,
                wsConnection,
                wsConnectionError,
                wsConnectionConnect,
                wsGetMessage } = wsActions
            if(wsConnection.match(action)) {
                wsUrl = action.payload
                socket = new WebSocket(`${wsUrl}`);
            }
            if(socket) {
                socket.onopen = () => {
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
                  socket.onclose = () => {
                    dispatch(wcConnectionClosed());
                  };
            }
            next(action);
        }
    })
}
