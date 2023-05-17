import { authorizationReducer, initialState } from './authorizationReducer';
import * as types from '../actions/logInOutProfile';
import { testUserData } from '../../utils/tests';

describe('authorizationReducer', () => {
  it('should return the initial state', () => {
    expect(authorizationReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle AUTHORIZATION_REQUEST', () => {
    expect(
      authorizationReducer(
        {},
        {
          type: types.AUTHORIZATION_REQUEST,
          authorizationRequest: true,
        },
      ),
    ).toEqual({
      authorizationRequest: true,
      authorizationFailed: false,
      isAithorizationSucceed: false,
    });
  });
  it('should handle AUTHORIZATION_SUCCEED', () => {
    expect(
      authorizationReducer(initialState, {
        type: types.AUTHORIZATION_SUCCEED,
        payload: testUserData,
      }),
    ).toEqual({
      profileData: testUserData,
      authorizationRequest: false,
      authorizationFailed: false,
      isAithorizationSucceed: true,
    });
  });
  it('should handle AUTHORIZATION_FAILED', () => {
    expect(
      authorizationReducer(
        {},
        {
          type: types.AUTHORIZATION_FAILED,
          authorizationFailed: true,
        },
      ),
    ).toEqual({
      authorizationRequest: false,
      authorizationFailed: true,
      isAithorizationSucceed: false,
    });
  });
  it('should handle AUTHORIZATION_LOGOUT', () => {
    expect(
      authorizationReducer(
        {},
        {
          type: types.AUTHORIZATION_LOGOUT,
          authorizationFailed: true,
        },
      ),
    ).toEqual({
      profileData: null,
      isAithorizationSucceed: false,
      authorizationFailed: true,
      authorizationRequest: false,
    });
  });
});
