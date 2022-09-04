import { IndividualUserRecord } from './ProfileTypes';

/**
 * Actions for reducer
 */
export enum UserEditAction {
  Email,
  Instituation,
  Name,
  Phone,
  Load,
}

/**
 * Initial state
 */
export const InitialUserState: IndividualUserRecord = {
  userEmail: '',
  userInstitution: '',
  userName: '',
  userPhone: '',
};

/**
 * Reducer for submission
 *
 * @param {IndividualUserRecord} state
 * @param {any} action
 * @returns {PosterState}
 */
export function UserEditReducer(state: IndividualUserRecord, action: any): IndividualUserRecord {
  switch (action.type) {
    case UserEditAction.Email:
      return { ...state, userEmail: action.payload };
    case UserEditAction.Instituation:
      return { ...state, userInstitution: action.payload };
    case UserEditAction.Name:
      return { ...state, userName: action.payload };
    case UserEditAction.Load:
      return { ...action.payload };

    default:
      throw new Error();
  }
}
