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

export const updateStatusForRecruitment = projectFunctions.httpsCallable(
  'updateStatusForRecruitment',
);

export const updateStatusForPoster = projectFunctions.httpsCallable('updateStatusForPoster');

export const createBlankTemplateRecruitment = projectFunctions.httpsCallable(
  'createBlankTemplateRecruitment',
);

export const getAggregatedDiversityInformation = projectFunctions.httpsCallable(
  'getAggregatedDiversityInformation',
);

export const getFilteredRecruitmentInformation = projectFunctions.httpsCallable(
  'getFilteredRecruitmentInformation',
);

export function useFirebaseFunction() {
  return {
    updateStatusForRecruitment,
    createBlankTemplateRecruitment,
    updateStatusForPoster,
    getAggregatedDiversityInformation,
    getFilteredRecruitmentInformation,
  };
}
