/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  AuthorizationContextStateInterface,
  FirebaseLoginAction,
} from '../interfaces/AuthorizationInterfaces';

export const InitialAuthorizationState = {
  user: null,
  authIsReady: false,
  studentRecruitFlag: false,
  adFlag: false,
  sysAdminFlag: false,
  systemAdministratorFlag: false,
  diversityReviewFlag: false,
  submissionReviewFlag: false,
};

export enum AuthorizationStates {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  READY = 'READY',
  CLAIMS = 'CLAIMS',
  THROWERR = 'THROWERR',
}

/** AuthorizationReducer
 *
 * Reducer for firestore login
 *
 * @param {AuthorizationContextStateInterface} state Current state
 * @param {FirebaseLoginAction} action Action type
 * @returns {AuthorizationContextStateInterface}
 */
export function authorizationReducer(
  state: AuthorizationContextStateInterface,
  action: FirebaseLoginAction,
): AuthorizationContextStateInterface {
  switch (action.type) {
    case AuthorizationStates.LOGIN:
      return {
        ...state,
        user: action.payloadUser,
        authIsReady: false,
        studentRecruitFlag: action.payloadStudentRecruitmentFlag,
        systemAdministratorFlag: action.payloadFlagSysAdmin,
        diversityReviewFlag: action.payloadDiversityReviewFlag,

      };
    case AuthorizationStates.LOGOUT:
      return {
        ...state,
        user: null,
        studentRecruitFlag: false,
        systemAdministratorFlag: false,
        diversityReviewFlag: false,
      };
    case AuthorizationStates.READY:
      return {
        user: action.payloadUser,
        authIsReady: true,
        studentRecruitFlag: action.payloadStudentRecruitmentFlag,
        systemAdministratorFlag: action.payloadFlagSysAdmin,
        diversityReviewFlag: action.payloadDiversityReviewFlag,
        submissionReviewFlag: action.payloadFlagSubmissionReview,
      } as AuthorizationContextStateInterface;
    case AuthorizationStates.CLAIMS:
      return {
        user: action.payloadUser,
        authIsReady: true,
        studentRecruitFlag: action.payloadStudentRecruitmentFlag,
        systemAdministratorFlag: action.payloadFlagSysAdmin,
        diversityReviewFlag: action.payloadDiversityReviewFlag,
        submissionReviewFlag: action.payloadFlagSubmissionReview,
      } as AuthorizationContextStateInterface;
    default:
      return state;
  }
}
