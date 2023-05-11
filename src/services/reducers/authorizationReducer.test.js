import { authorizationReducer, initialState } from './authorizationReducer';
import * as types from '../actions/logInOutProfile';
import { testUserData } from '../../utils/tests';

describe('authorizationReducer', () => {
  it('should return the initial state', () => {
    expect(authorizationReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle AUTHORIZATION_REQUEST', () => {
    expect(
      authorizationReducer(initialState, {
        type: types.AUTHORIZATION_REQUEST,
      }),
    ).toEqual({
      ...initialState,
      authorizationRequest: true,
      isAithorizationSucceed: false,
      authorizationFailed: false,
    });
  });
  it('should handle AUTHORIZATION_SUCCEED', () => {
    expect(
      authorizationReducer(initialState, {
        type: types.AUTHORIZATION_SUCCEED,
        profileData: testUserData,
      }),
    ).toEqual({
      ...initialState,
      profileData: testUserData,
      isAithorizationSucceed: true,
    });
  });
  it('should handle AUTHORIZATION_FAILED', () => {
    expect(
      authorizationReducer(initialState, {
        type: types.AUTHORIZATION_FAILED,
      }),
    ).toEqual({
      ...initialState,
      authorizationRequest: false,
      isAithorizationSucceed: false,
      authorizationFailed: true,
    });
  });
  it('should handle AUTHORIZATION_LOGOUT', () => {
    expect(
      authorizationReducer(initialState, {
        type: types.AUTHORIZATION_LOGOUT,
        profileData: null,
      }),
    ).toEqual({
      ...initialState,
      profileData: null,
      authorizationFailed: true,
    });
  });
});
