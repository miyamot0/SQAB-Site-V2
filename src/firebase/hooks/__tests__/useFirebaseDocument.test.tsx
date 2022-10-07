/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { mockFirebase } from 'firestore-jest-mock';
import { useFirebaseDocumentTyped } from '../useFirebaseDocument';
import { PosterSubmission } from '../../types/RecordTypes';

describe('useFirebaseCollectionTyped', () => {
  mockFirebase({
    database: {
      users: [
        {
          id: '123',
          displayEmail: 'displayEmail',
          displayName: 'displayName',
          displaySchool: 'displaySchool',
        },
      ],
      performances: [],
    },
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should fail on bogus query', async () => {
    await act(async () => {
      const { result, waitFor } = renderHook(() =>
        useFirebaseDocumentTyped<PosterSubmission>({
          collectionString: 'asdfasf',
          idString: '123',
        }),
      );

      await waitFor(() => {
        expect(result.error).toBe(true);
      });
    });
  });

  // TODO: clean up on snapshot change
});
