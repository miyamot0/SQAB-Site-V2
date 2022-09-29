/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IndividualUserRecord } from '../../../firebase/types/RecordTypes';
import { ProfileActions } from '../types/ProfileActionTypes';

/**
 * Actions for reducer
 */
export enum UserEditAction {
  Email,
  Institution,
  Name,
  Phone,
  Load,
  EditEducation,
  EditGender,
  EditAge,
  EditRaceEthnicity,
  EditOrientation,
  EditLanguage,
  EditNationality,
  EditPhoneAuthed,
  EditFormError,
  EditDidBuild,
}

/**
 * Initial state
 */
export const InitialUserState: IndividualUserRecord = {
  userEmail: '',
  userInstitution: '',
  userName: '',
  userPhone: '',
  perms: 'baseuser',
  canPostAd: false,
  formError: undefined,
  phoneAuthed: false,
  didBuild: false,
  userEducation: undefined,
  userGender: undefined,
  userAge: undefined,
  userRaceEthnicity: undefined,
  userOrientation: undefined,
  userLanguage: undefined,
  userNationality: undefined,
};

/**
 * Reducer for submission
 *
 * @param {IndividualUserRecord} state
 * @param {any} action
 * @returns {PosterState}
 */
export function UserEditReducer(
  state: IndividualUserRecord,
  action: ProfileActions,
): IndividualUserRecord {
  switch (action.type) {
    case UserEditAction.Email:
      return {
        ...state, userEmail: action.payload,
        formError: undefined
      };
    case UserEditAction.Institution:
      return {
        ...state, userInstitution: action.payload,
        formError: undefined
      };
    case UserEditAction.Name:
      return {
        ...state, userName: action.payload,
        formError: undefined
      };
    case UserEditAction.EditEducation:
      return {
        ...state, userEducation: action.payload,
        formError: undefined
      };
    case UserEditAction.EditGender:
      return {
        ...state, userGender: action.payload,
        formError: undefined
      };
    case UserEditAction.EditAge:
      return {
        ...state, userAge: action.payload,
        formError: undefined
      };
    case UserEditAction.EditRaceEthnicity:
      return {
        ...state, userRaceEthnicity: action.payload,
        formError: undefined
      };
    case UserEditAction.EditOrientation:
      return {
        ...state, userOrientation: action.payload,
        formError: undefined
      };
    case UserEditAction.EditLanguage:
      return {
        ...state, userLanguage: action.payload,
        formError: undefined
      };
    case UserEditAction.EditNationality:
      return {
        ...state, userNationality: action.payload,
        formError: undefined
      };
    case UserEditAction.EditPhoneAuthed:
      return { ...state, phoneAuthed: action.payload };
    case UserEditAction.EditFormError:
      return { ...state, formError: action.payload };
    case UserEditAction.EditDidBuild:
      return {
        ...state,
        didBuild: action.payload,
        formError: undefined
      };
    case UserEditAction.Load:
      return { ...action.payload };
    default:
      throw new Error();
  }
}
