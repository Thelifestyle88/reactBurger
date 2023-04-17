import {
  GET_PROFILE_INFORMATION_REQUEST,
  GET_PROFILE_INFORMATION_SUCCEED,
  GET_PROFILE_INFORMATION_FAILED,
  CHANGE_PROFILE_INFORMATION_SUCCEED,
} from '../actions/getProfile';

import { AUTHORIZATION_SUCCEED } from '../actions/logInOutProfile';

const initialState = {
  profileData: null,
  profileInformationRequest: false,
  profileInformationFailed: false,
  isAithorizationSucceed: false,
  getProfileSucceed: false,
};

export function profileInformationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_INFORMATION_REQUEST: {
      return {
        ...state,
        profileInformationRequest: true,
        isAithorizationSucceed: false,
        profileInformationFailed: false,
      };
    }
    case GET_PROFILE_INFORMATION_SUCCEED: {
      return {
        ...state,
        profileData: action.profileData,
        profileInformationRequest: false,
        profileInformationFailed: false,
        getProfileSucceed: true,
      };
    }
    case CHANGE_PROFILE_INFORMATION_SUCCEED: {
      return {
        ...state,
        profileData: action.profileData,
        profileInformationRequest: false,
        profileInformationFailed: false,
        getProfileSucceed: true,
      };
    }

    case AUTHORIZATION_SUCCEED: {
      return {
        ...state,
        profileData: action.profileData,
        profileInformationRequest: false,
        profileInformationFailed: false,
        isAithorizationSucceed: true,
      };
    }

    case GET_PROFILE_INFORMATION_FAILED: {
      return {
        ...state,
        isAithorizationSucceed: false,
        profileInformationFailed: true,
        profileInformationRequest: false,
      };
    }
    default: {
      return state;
    }
  }
}
