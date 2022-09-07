import { IndividualUserRecord } from '../../../firebase/types/RecordTypes';
import { EditRecruitmentState } from '../../recruitment/types/RecruitmentTypes';
import { RecruitmentActions } from '../types/ProfileTypes';

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
 * Actions for reducer
 */
export enum RecruitmentEditAction {
  LoadUser,
  LoadRecruitment,
  EditPosition,
  EditMentorBio,
  EditDescription,
  EditLink,
  EditDate,
  EditLabLink,
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
 * Initial state
 */
export const InitialRecruitmentState: EditRecruitmentState = {
  userEmail: '',
  userInstitution: '',
  userName: '',
  userPhone: '',
  Bio: '',
  Cycle: '',
  Description: '',
  Institution: '',
  Link: '',
  LabLink: '',
  Position: '',
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

export function RecruitmentEditReducer(
  state: EditRecruitmentState,
  action: RecruitmentActions,
): any {
  switch (action.type) {
    case RecruitmentEditAction.LoadUser:
      return { ...state, ...action.payload };
    case RecruitmentEditAction.LoadRecruitment:
      return { ...state, ...action.payload };
    case RecruitmentEditAction.EditPosition:
      return { ...state, Position: action.payload };
    case RecruitmentEditAction.EditMentorBio:
      return { ...state, Bio: action.payload };
    case RecruitmentEditAction.EditDescription:
      return { ...state, Bio: action.payload };
    case RecruitmentEditAction.EditLink:
      return { ...state, Link: action.payload };
    case RecruitmentEditAction.EditDate:
      return { ...state, Cycle: action.payload };
    case RecruitmentEditAction.EditLabLink:
      return { ...state, LabLink: action.payload };

    default:
      throw new Error();
  }
}
