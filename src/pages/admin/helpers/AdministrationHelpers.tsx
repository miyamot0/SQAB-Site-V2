/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFirebaseFunction } from '../../../firebase/hooks/useFirebaseFunction';
import { PosterSubmission, RecruitmentAd } from '../../../firebase/types/RecordTypes';
import { SingleOptionType } from '../../tools/types/GeneralTypes';

const { updateStatusForRecruitment, createBlankTemplateRecruitment, updateStatusForPoster } =
  useFirebaseFunction();

/** createBlankAdTemplate
 *
 * Create a template and amend user claims
 *
 */
export async function createBlankAdTemplate(selectedAdUser: SingleOptionType) {
  if (selectedAdUser.value.trim().length < 1) {
    alert('Select a user to add a recruitment template');
  }

  try {
    await createBlankTemplateRecruitment({ recruiterId: selectedAdUser.value });
  } catch (err) {
    alert(err);
  }
}

/** toggleRecruitmentStatus
 *
 * Modify recruitment status on the back end
 *
 * @param {RecruitmentAd} recr objec
 */
export async function toggleRecruitmentStatus(recr: RecruitmentAd) {
  try {
    await updateStatusForRecruitment({
      recruitmentId: recr.id,
      recruitmentApproval: !recr.Approved,
    });
  } catch (err) {
    alert(err);
  }
}

/** toggleRecruitmentStatus
 *
 * Modify recruitment status on the back end
 *
 * @param {PosterSubmission} poster objec
 */
export async function togglePosterStatus(poster: PosterSubmission) {
  try {
    await updateStatusForPoster({
      posterId: poster.id,
      posterApproval: !poster.reviewed,
    });
  } catch (err) {
    alert(err);
  }
}
