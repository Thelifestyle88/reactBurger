import {
  AUTHORIZATION_SUCCEED,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_FAILED,
  AUTHORIZATION_LOGOUT,
} from '../actions/logInOutProfile';
import { PayloadAction } from '@reduxjs/toolkit'
import { TUser } from '../../utils/typesData';

interface IAuthorizationState {
  profileData: null | TUser,
  authorizationRequest: boolean,
  authorizationFailed: boolean,
  isAithorizationSucceed: boolean,
}

export const initialState: IAuthorizationState = {
  profileData: null,
  authorizationRequest: false,
  authorizationFailed: false,
  isAithorizationSucceed: false,
};

export function authorizationReducer(state = initialState, action: PayloadAction<TUser>) {
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
        profileData: action.payload,
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
