/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createBlankTemplateRecruitment,
  getAggregatedDiversityInformation,
  updateStatusForPoster,
  updateStatusForRecruitment,
} from '../../../firebase/hooks/useFirebaseFunction';
import { DiversityFunctionResponse } from '../../../firebase/types/FunctionTypes';
import { PosterSubmission, RecruitmentAd } from '../../../firebase/types/RecordTypes';
import { SingleOptionType } from '../../tools/types/GeneralTypes';

/** createBlankAdTemplate
 *
 * Create a template and amend user claims
 *
 */
export async function createBlankAdTemplate(selectedAdUser: SingleOptionType) {
  if (selectedAdUser.value.trim().length < 1) {
    alert('Select a user to add a recruitment template');
  } else {
    await createBlankTemplateRecruitment({ recruiterId: selectedAdUser.value });
  }
}

/** toggleRecruitmentStatus
 *
 * Modify recruitment status on the back end
 *
 * @param {RecruitmentAd} recr objec
 */
export async function toggleRecruitmentStatus(recr: RecruitmentAd) {
  await updateStatusForRecruitment({
    recruitmentId: recr.id,
    recruitmentApproval: !recr.Approved,
  });
}

/** toggleRecruitmentStatus
 *
 * Modify recruitment status on the back end
 *
 * @param {PosterSubmission} poster objec
 */
export async function togglePosterStatus(poster: PosterSubmission) {
  await updateStatusForPoster({
    posterId: poster.id,
    posterApproval: !poster.reviewed,
  });
}

/** toggleRecruitmentStatus
 *
 * Modify recruitment status on the back end
 *
 * @param {PosterSubmission} poster objec
 */
export async function pullAggregatedDiversityInformation(setCurrentDemographics: any) {
  const value = await getAggregatedDiversityInformation();

  if (value && value.data && value.data.genderData) {
    const cast = value.data as DiversityFunctionResponse;
    setCurrentDemographics(cast);
  } else {
    setCurrentDemographics(null);
  }
}
