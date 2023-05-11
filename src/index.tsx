import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { rootReducer } from './services';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import {
  wcConnectionClosed,
  wsConnection,
  wsConnectionError,
  wsConnectionConnect,
  wsGetMessage,
  TwsActions,
} from './services/middleware/wsActionsType';

const wsActions: TwsActions = {
  wcConnectionClosed,
  wsConnection,
  wsConnectionError,
  wsConnectionConnect,
  wsGetMessage,
};

const ordersMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>,
);
