import { getProfileInformation } from '../../utils/api';
import { resetToken } from '../../utils/api';

export const GET_PROFILE_INFORMATION_REQUEST = 'GET_PROFILE_INFORMATION_REQUEST';
export const GET_PROFILE_INFORMATION_SUCCEED = 'GET_PROFILE_INFORMATION_SUCCEED';
export const GET_PROFILE_INFORMATION_FAILED = 'GET_PROFILE_INFORMATION_FAILED';

export function getInformation() {
  return function (dispatch) {
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
      .catch((res) => {
        console.log(res);
        if (res.success === false) {
          resetToken().then((res) => {
            if (res && res.success) {
              localStorage.removeItem('accessToken');
              localStorage.setItem('refreshToken', res.refreshToken);
              localStorage.setItem('accessToken', res.accessToken);
            }
          });
        }
      });
  };
}
