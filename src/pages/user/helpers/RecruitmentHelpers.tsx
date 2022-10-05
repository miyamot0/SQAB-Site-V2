/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { RecruitmentAd } from "../../../firebase/types/RecordTypes";

/** dateToYMD
 *
 * @param {string} dateString
 * @returns
 */
export function dateToYMD(dateString: string) {
  const date = new Date(dateString);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

/** dateToMDY
 *
 * @param {string} dateString
 * @returns
 */
export function dateToMDY(dateString: string) {
  const date = new Date(dateString);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
}

/** handleEditFormSubmit
 *
 * Submission event for student edit form
 *
 */
export async function handleEditRecruitmentSubmit(state: RecruitmentAd, id: string | undefined,
  updateDocument: any, history: any, response: FirestoreState): Promise<void> {

  const selectedProperties = {
    Bio: state.Bio,
    Contact: state.Contact,
    Cycle: state.Cycle,
    Description: state.Description,
    Institution: state.Institution,
    LabLink: state.LabLink,
    Link: state.Link,
    Mentor: state.Mentor,
    Name: state.Name,
    Position: state.Position,
  };

  selectedProperties.Cycle = dateToMDY(selectedProperties.Cycle);

  await updateDocument(id, selectedProperties);

  if (response.error) {
    alert(response.error);
  } else {
    history.push('/');
  }

  return;
}