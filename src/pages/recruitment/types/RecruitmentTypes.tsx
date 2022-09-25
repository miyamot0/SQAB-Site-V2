/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface EditRecruitmentState {
  userEmail: string;
  userInstitution: string;
  userName: string;
  userPhone: string;
  Bio: string;
  Cycle: string;
  Description: string;
  Institution: string;
  Link: string;
  LabLink: string;
  Position: string;
}

export interface RoutedMentor {
  id: string;
}
