/** * @jest-environment node */

import { renderHook } from '@testing-library/react-hooks';
import { useFirebaseFunction } from '../useFirebaseFunction';

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('useFirebaseFunction', () => {
  it('Should fail on bogus query', async () => {
    const {
      updateStatusForRecruitment,
      createBlankTemplateRecruitment,
      updateStatusForPoster,
      getAggregatedDiversityInformation,
      getFilteredRecruitmentInformation,
    } = useFirebaseFunction();
  });
});
