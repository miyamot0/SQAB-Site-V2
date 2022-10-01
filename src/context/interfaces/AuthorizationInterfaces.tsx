/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase/app';
import { AuthorizationStates } from '../functionality/AuthorizationBehavior';
import { LoginDispatch } from '../types/AuthorizationTypes';

export interface AuthorizationContextInterface {
  user: firebase.User | null;
  authIsReady: boolean;
  studentRecruitFlag: boolean;
  systemAdministratorFlag: boolean;
  diversityReviewFlag: boolean;
  canEditRecruitmentAdFlag: boolean;
  dispatch: LoginDispatch | undefined;
}

export interface AuthorizationContextStateInterface {
  user: firebase.User | null;
  authIsReady: boolean;
  studentRecruitFlag: boolean;
  systemAdministratorFlag: boolean;
  diversityReviewFlag: boolean;
  canEditRecruitmentAdFlag: boolean;
}

export interface FirebaseLoginAction {
  type: AuthorizationStates;
  payloadUser: firebase.User | null;
  payloadStudentRecruitmentFlag: boolean;
  payloadFlagRecruiter: boolean;
  payloadDiversityReviewFlag: boolean;
  payloadFlagSysAdmin: boolean;
}
