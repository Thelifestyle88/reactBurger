import { TUser } from '../../utils/typesData';
import {
  GET_PROFILE_INFORMATION_REQUEST,
  GET_PROFILE_INFORMATION_SUCCEED,
  GET_PROFILE_INFORMATION_FAILED,
  CHANGE_PROFILE_INFORMATION_SUCCEED,
} from '../actions/getProfile';

import { AUTHORIZATION_SUCCEED } from '../actions/logInOutProfile';
import { PayloadAction } from '@reduxjs/toolkit'

interface IProfileInformationState {
  profileData: null | TUser,
  profileInformationRequest: boolean,
  profileInformationFailed: boolean,
  isAuthorizationSucceed: boolean,
  getProfileSucceed: boolean,
}


const initialState:IProfileInformationState = {
  profileData: null,
  profileInformationRequest: false,
  profileInformationFailed: false,
  isAuthorizationSucceed: false,
  getProfileSucceed: false,
};

export function profileInformationReducer(state = initialState, action: PayloadAction<TUser>) {
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
    default: {
      return state;
    }
  }
}
