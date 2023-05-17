import { getAllOrderReducer, initialState } from './getAllOrdersReducer';
import * as types from '../middleware/wsActionsType';

describe('getAllOrderReducer', () => {
  it('должен вернуть initial state', () => {
    expect(getAllOrderReducer(initialState, { initialState })).toEqual(initialState);
  });
  it('wsConnection', () => {
    expect(
      getAllOrderReducer(initialState, {
        type: types.wsConnection,
        ...initialState,
        status: 'CONNECTING...',
      }),
    ).toEqual({
      ...initialState,
      status: 'CONNECTING...',
    });
  });
  it('wsConnectionConnect', () => {
    expect(
      getAllOrderReducer(initialState, {
        type: types.wsConnectionConnect,
        ...initialState,
        status: 'ONLINE',
        connectionError: ' ',
      }),
    ).toEqual({
      ...initialState,
      status: 'ONLINE',
      connectionError: ' ',
    });
  });
  it('wcConnectionClosed', () => {
    expect(
      getAllOrderReducer(initialState, {
        type: types.wcConnectionClosed,
        ...initialState,
        status: 'OFFLINE',
      }),
    ).toEqual({
      ...initialState,
      status: 'OFFLINE',
    });
  });
  it('wsConnectionError', () => {
    expect(
      getAllOrderReducer(initialState, {
        type: types.wsConnectionError,
        ...initialState,
        payload: 'some error,',
      }),
    ).toEqual({
      ...initialState,
      connectionError: 'some error,',
    });
  });
  it('wsGetMessage', () => {
    expect(
      getAllOrderReducer(initialState, {
        ...initialState,
        type: types.wsGetMessage,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      orders: [],
    });
  });
});
