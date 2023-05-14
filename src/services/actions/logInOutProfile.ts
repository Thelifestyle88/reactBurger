import { Dispatch } from 'redux';
import { authorization, logOut } from '../../utils/api';
import { TProfile } from '../../utils/typesData';
import { AppDispatch } from '../..';

export const AUTHORIZATION_REQUEST: 'AUTHORIZATION_REQUEST' = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCEED: 'AUTHORIZATION_SUCCEED' = 'AUTHORIZATION_SUCCEED';
export const AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED' = 'AUTHORIZATION_FAILED';
export const AUTHORIZATION_LOGOUT: 'AUTHORIZATION_LOGOUT' = 'AUTHORIZATION_LOGOUT';

export function logInProfile(profile: TProfile) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTHORIZATION_REQUEST,
    });
    authorization(profile)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('accessToken', res.accessToken);
          dispatch({
            type: AUTHORIZATION_SUCCEED,
            payload: res.user,
          });
        } else {
          dispatch({
            type: AUTHORIZATION_FAILED,
          });
        }
      })
      .catch(console.error);
  };
}

export function logOutProfile() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTHORIZATION_REQUEST,
    });
    logOut()
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          dispatch({
            type: AUTHORIZATION_LOGOUT,
            payload: null,
          });
        } else {
          dispatch({
            type: AUTHORIZATION_FAILED,
          });
        }
      })
      .catch(console.error);
  };
}
