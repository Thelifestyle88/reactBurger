import { profileInformationReducer, initialState } from './profileInformationReducer';
import * as types from '../actions/getProfile';
import { testUserData } from '../../utils/tests';

describe('profileInformationReducer', () => {
  it('должен вернуть initial state', () => {
    expect(profileInformationReducer(undefined, {})).toEqual(initialState);
  });
  it('GET_PROFILE_INFORMATION_REQUEST', () => {
    expect(
      profileInformationReducer(initialState, {
        type: types.GET_PROFILE_INFORMATION_REQUEST,
        profileInformationRequest: true,
      }),
    ).toEqual({
      ...initialState,
      profileInformationRequest: true,
    });
  });
  it('GET_PROFILE_INFORMATION_SUCCEED', () => {
    expect(
      profileInformationReducer(initialState, {
        type: types.GET_PROFILE_INFORMATION_SUCCEED,
        getProfileSucceed: true,
        payload: testUserData,
      }),
    ).toEqual({
      ...initialState,
      profileData: testUserData,
      getProfileSucceed: true,
    });
  });
  it('CHANGE_PROFILE_INFORMATION_SUCCEED', () => {
    expect(
      profileInformationReducer(initialState, {
        type: types.CHANGE_PROFILE_INFORMATION_SUCCEED,
        getProfileSucceed: true,
        payload: testUserData,
      }),
    ).toEqual({
      ...initialState,
      profileData: testUserData,
      getProfileSucceed: true,
    });
  });
  it('GET_PROFILE_INFORMATION_FAILED', () => {
    expect(
      profileInformationReducer(initialState, {
        type: types.GET_PROFILE_INFORMATION_FAILED,
        profileInformationFailed: true,
      }),
    ).toEqual({
      ...initialState,
      profileInformationFailed: true,
    });
  });
});
