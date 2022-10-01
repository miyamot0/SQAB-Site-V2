/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Firebase hook
 */

import { projectFunctions } from '../config';

export function useFirebaseFunction() {
  const updateStatusForRecruitment = projectFunctions.httpsCallable('updateStatusForRecruitment');

  const updateStatusForPoster = projectFunctions.httpsCallable('updateStatusForPoster');

  const createBlankTemplateRecruitment = projectFunctions.httpsCallable(
    'createBlankTemplateRecruitment',
  );

  const getAggregatedDiversityInformation = projectFunctions.httpsCallable(
    'getAggregatedDiversityInformation',
  );

  // get id/name/email/recruitment status

  return {
    updateStatusForRecruitment,
    createBlankTemplateRecruitment,
    updateStatusForPoster,
    getAggregatedDiversityInformation,
  };
}
