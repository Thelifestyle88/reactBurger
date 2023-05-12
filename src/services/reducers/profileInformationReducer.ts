import { IUser } from '../../utils/typesData';
import {
  GET_PROFILE_INFORMATION_REQUEST,
  GET_PROFILE_INFORMATION_SUCCEED,
  GET_PROFILE_INFORMATION_FAILED,
  CHANGE_PROFILE_INFORMATION_SUCCEED,
  TProfileActions,
} from '../actions/getProfile';

import { AUTHORIZATION_SUCCEED, AUTHORIZATION_LOGOUT } from '../actions/logInOutProfile';

interface IProfileInformationState {
  profileData: null | IUser,
  profileInformationRequest: boolean,
  profileInformationFailed: boolean,
  isAuthorizationSucceed: boolean,
  getProfileSucceed: boolean,
}


export const initialState:IProfileInformationState = {
  profileData: null,
  profileInformationRequest: false,
  profileInformationFailed: false,
  isAuthorizationSucceed: false,
  getProfileSucceed: false,
};

export function profileInformationReducer(state = initialState, action: TProfileActions)  {
  switch (action.type) {
    case GET_PROFILE_INFORMATION_REQUEST: {
      return {
        ...state,
        profileInformationRequest: true,
        isAuthorizationSucceed: false,
        profileInformationFailed: false,
      };
    }
    case GET_PROFILE_INFORMATION_SUCCEED: {
      return {
        ...state,
        profileData: action.payload,
        profileInformationRequest: false,
        profileInformationFailed: false,
        getProfileSucceed: true,
      };
    }
    case CHANGE_PROFILE_INFORMATION_SUCCEED: {
      return {
        ...state,
        profileData: action.payload,
        profileInformationRequest: false,
        profileInformationFailed: false,
        getProfileSucceed: true,
      };
    }

    case AUTHORIZATION_SUCCEED: {
      return {
        ...state,
        profileData: action.payload,
        profileInformationRequest: false,
        profileInformationFailed: false,
        isAuthorizationSucceed: true,
      };
    }

    case GET_PROFILE_INFORMATION_FAILED: {
      return {
        ...state,
        isAuthorizationSucceed: false,
        profileInformationFailed: true,
        profileInformationRequest: false,
      };
    }
    case AUTHORIZATION_LOGOUT: {
      return {
        ...state,
        profileData: action.payload,
        isAuthorizationSucceed: false,
        profileInformationFailed: true,
        profileInformationRequest: false,
      };
    }
    default: {
      return state;
    }
  }
}
