/** * @jest-environment node */

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useFirebaseDocumentTyped } from '../useFirebaseDocument';
import { PosterSubmission } from '../../types/RecordTypes';
import { mockCollection, mockDoc } from '../../../../jestSetup';

describe('useFirebaseCollectionTyped', () => {
  it('Should fail on bogus query', async () => {
    const { result } = renderHook(() =>
      useFirebaseDocumentTyped<PosterSubmission>({
        collectionString: 'posters',
        idString: '123',
      }),
    );

    expect(mockCollection).toBeCalled();
    expect(mockDoc).toBeCalled();
  });
});
