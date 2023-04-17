import {
  AUTHORIZATION_SUCCEED,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_FAILED,
  AUTHORIZATION_LOGOUT,
} from '../actions/logInOutProfile';

const initialState = {
  profileData: null,
  authorizationRequest: false,
  authorizationFailed: false,
  isAithorizationSucceed: false,
};

export function authorizationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZATION_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
        isAithorizationSucceed: false,
        authorizationFailed: false,
      };
    }
    case AUTHORIZATION_SUCCEED: {
      return {
        ...state,
        profileData: action.profileData,
        authorizationRequest: false,
        authorizationFailed: false,
        isAithorizationSucceed: true,
      };
    }
    case AUTHORIZATION_FAILED: {
      return {
        ...state,
        isAithorizationSucceed: false,
        authorizationFailed: true,
        authorizationRequest: false,
      };
    }
    case AUTHORIZATION_LOGOUT: {
      return {
        ...state,
        profileData: null,
        isAithorizationSucceed: false,
        authorizationFailed: true,
        authorizationRequest: false,
      };
    }
    default: {
      return state;
    }
  }
}
