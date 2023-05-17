import { Dispatch } from 'redux';
import { authorization, logOut } from '../../utils/api';
import { TProfile } from '../../utils/typesData';
import { AppDispatch } from '../..';
import { setCookie } from '../../utils/cookie';

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
          console.log(res)
          setCookie('accessToken', res.accessToken)
          setCookie('refreshToken', res.refreshToken)
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
          document.cookie = `refreshToken = ${res.refreshToken}; path=/; max-age=0`;
          document.cookie = `accessToken = ${res.accessToken}; path=/; max-age=0`;
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
