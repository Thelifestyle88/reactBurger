import { authorization } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const AUTHORIZATION_REQUEST = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCEED = 'AUTHORIZATION_SUCCEED';
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';

export function logInProfile(profile) {
  return function (dispatch) {
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
            profileData: res.user,
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
