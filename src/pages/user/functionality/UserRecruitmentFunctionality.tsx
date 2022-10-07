/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EditRecruitmentState } from '../../recruitment/types/RecruitmentTypes';
import { RecruitmentActions } from '../types/RecruitmentActionTypes';

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

/** RecruitmentEditReducer
 *
 * @param state
 * @param action
 * @returns
 */
export function RecruitmentEditReducer(
  state: EditRecruitmentState,
  action: RecruitmentActions,
): EditRecruitmentState {
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
      return { ...state, Description: action.payload };
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
