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

import { projectFunctions } from './config';

export function useFirebaseFunction() {
  const updateStatusForRecruitment = projectFunctions.httpsCallable('updateStatusForRecruitment');

  const createBlankTemplateRecruitment = projectFunctions.httpsCallable(
    'createBlankTemplateRecruitment',
  );

  return { updateStatusForRecruitment, createBlankTemplateRecruitment };
}
