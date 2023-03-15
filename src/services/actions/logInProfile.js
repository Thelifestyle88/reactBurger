import { authorization } from '../../utils/api';

export const GET_PROFILE_INFORMATION_REQUEST = 'GET_PROFILE_INFORMATION_REQUEST';
export const GET_PROFILE_INFORMATION_SUCCEED = 'GET_PROFILE_INFORMATION_SUCCEED';
export const GET_PROFILE_INFORMATION_FAILED = 'GET_PROFILE_INFORMATION_FAILED';

export function logInProfile(profile) {
  return function (dispatch) {
    dispatch({
      type: GET_PROFILE_INFORMATION_REQUEST,
    });
    authorization(profile)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('accessToken ', res.accessToken);
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
