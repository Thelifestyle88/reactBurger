import { Dispatch } from 'redux';
import { getProfileInformation, changeProfileInformation } from '../../utils/api';
import { IUser, TUser } from '../../utils/typesData';
import { AUTHORIZATION_FAILED, AUTHORIZATION_LOGOUT } from './logInOutProfile';
import { AppDispatch } from '../..';

export const GET_PROFILE_INFORMATION_REQUEST: 'GET_PROFILE_INFORMATION_REQUEST' = 'GET_PROFILE_INFORMATION_REQUEST';
export const GET_PROFILE_INFORMATION_SUCCEED: 'GET_PROFILE_INFORMATION_SUCCEED' = 'GET_PROFILE_INFORMATION_SUCCEED';
export const GET_PROFILE_INFORMATION_FAILED: 'GET_PROFILE_INFORMATION_FAILED' = 'GET_PROFILE_INFORMATION_FAILED';
export const AUTHORIZATION_SUCCEED: 'AUTHORIZATION_SUCCEED' = 'AUTHORIZATION_SUCCEED';
export const CHANGE_PROFILE_INFORMATION_SUCCEED: 'CHANGE_PROFILE_INFORMATION_SUCCEED' = 'CHANGE_PROFILE_INFORMATION_SUCCEED';

export interface IProfileRequest {
  readonly type: typeof GET_PROFILE_INFORMATION_REQUEST;
}

export interface IProfileSucceed {
  readonly type: typeof GET_PROFILE_INFORMATION_SUCCEED;
  payload: IUser;
}

export interface IProfileFailed {
 readonly type: typeof GET_PROFILE_INFORMATION_FAILED;
}

export interface IAuthorizationSucceed {
  readonly type: typeof AUTHORIZATION_SUCCEED;
  payload: IUser
}

export interface IChangeProfile {
  readonly type: typeof CHANGE_PROFILE_INFORMATION_SUCCEED;
  payload: IUser;
}

export interface IAuthorizationLogout {
  readonly type: typeof AUTHORIZATION_LOGOUT;
  payload: null;
}

export type TProfileActions = | IProfileRequest | IProfileSucceed | IProfileFailed | IAuthorizationSucceed | IChangeProfile | IAuthorizationLogout

export function getInformation() {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_PROFILE_INFORMATION_REQUEST,
    });
    getProfileInformation()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_PROFILE_INFORMATION_SUCCEED,
            payload: res.user,
          });
        } else {
          dispatch({
            type: GET_PROFILE_INFORMATION_FAILED,
          });
        }
      })
      .catch(console.error)
  };
}

export const checkUserAuth = () => (dispatch:AppDispatch) => {
  if (localStorage.getItem('accessToken')) {
    getProfileInformation().finally(() => {
      dispatch({ type: AUTHORIZATION_SUCCEED });
    });
  } else {
    dispatch({ type: AUTHORIZATION_FAILED });
  }
};

export function changeProfile(user: IUser) {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_PROFILE_INFORMATION_REQUEST,
    });
    changeProfileInformation(user)
      .then((res:TUser) => {
        if (res && res.success) {
          dispatch({
            type: CHANGE_PROFILE_INFORMATION_SUCCEED,
            payload: res.user,
          });
        } else {
          dispatch({
            type: GET_PROFILE_INFORMATION_FAILED,
          });
        }
      })
      .catch(console.error);
  };
}