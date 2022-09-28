/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RecruitmentEditAction } from '../functionality/UserRecruitmentFunctionality';

export type RecruitmentActions =
  | { type: RecruitmentEditAction.LoadUser; payload: any }
  | { type: RecruitmentEditAction.LoadRecruitment; payload: any }
  | { type: RecruitmentEditAction.EditPosition; payload: string }
  | { type: RecruitmentEditAction.EditMentorBio; payload: string }
  | { type: RecruitmentEditAction.EditDescription; payload: string }
  | { type: RecruitmentEditAction.EditLink; payload: string }
  | { type: RecruitmentEditAction.EditDate; payload: string }
  | { type: RecruitmentEditAction.EditLabLink; payload: string };
