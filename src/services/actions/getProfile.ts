import { Dispatch } from 'redux';
import { getProfileInformation, changeProfileInformation } from '../../utils/api';
import { TUser } from '../../utils/typesData';

export const GET_PROFILE_INFORMATION_REQUEST: 'GET_PROFILE_INFORMATION_REQUEST' = 'GET_PROFILE_INFORMATION_REQUEST';
export const GET_PROFILE_INFORMATION_SUCCEED: 'GET_PROFILE_INFORMATION_SUCCEED' = 'GET_PROFILE_INFORMATION_SUCCEED';
export const GET_PROFILE_INFORMATION_FAILED: 'GET_PROFILE_INFORMATION_FAILED' = 'GET_PROFILE_INFORMATION_FAILED';
export const AUTHORIZATION_SUCCEED: 'AUTHORIZATION_SUCCEED' = 'AUTHORIZATION_SUCCEED';
export const CHANGE_PROFILE_INFORMATION_SUCCEED: 'CHANGE_PROFILE_INFORMATION_SUCCEED' = 'CHANGE_PROFILE_INFORMATION_SUCCEED';

export function getInformation() {
  return function (dispatch:Dispatch<any>) {
    dispatch({
      type: GET_PROFILE_INFORMATION_REQUEST,
    });
    getProfileInformation()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_PROFILE_INFORMATION_SUCCEED,
            profileData: res.user,
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

export const checkUserAuth = () => (dispatch:Dispatch<any>) => {
  if (localStorage.getItem('accessToken')) {
    getProfileInformation().finally(() => {
      dispatch({ type: AUTHORIZATION_SUCCEED });
    });
  } else {
    dispatch({ type: AUTHORIZATION_SUCCEED });
  }
};

export function changeProfile(name:TUser, post: TUser) {
  return function (dispatch:Dispatch<any>) {
    dispatch({
      type: GET_PROFILE_INFORMATION_REQUEST,
    });
    changeProfileInformation(name, post)
      .then((res:TUser) => {
        if (res && res.success) {
          dispatch({
            type: CHANGE_PROFILE_INFORMATION_SUCCEED,
            profileData: res.user,
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
