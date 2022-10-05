/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from '@testing-library/react-hooks';
import { useFirebaseCollectionTyped } from '../useFirebaseCollection';
import { mockFirebase } from 'firestore-jest-mock';
import { mockWhere, mockOrderBy } from 'firestore-jest-mock/mocks/firestore';

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
    const { result, waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: undefined,
        orderString: undefined,
      }),
    );

    waitFor(() => {
      expect(result.error).toBe(true);
    });
  });

  it('Should query against firestore, users', async () => {
    const mockInput = ['uid', '=', '123'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: mockInput,
        orderString: undefined,
      }),
    );

    waitFor(() => {
      expect(mockWhere).toBeCalledWith(mockInput);
    });
  });

  it('Should orderby against firestore, users', async () => {
    const mockInput = ['id', 'asc'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: undefined,
        orderString: mockInput,
      }),
    );

    waitFor(() => {
      expect(mockOrderBy).toBeCalledWith(mockInput);
    });
  });

  it('Should query against firestore, performances', async () => {
    const mockInput = ['uid', '=', '123'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: `users/123`,
        queryString: mockInput,
        orderString: undefined,
      }),
    );

    waitFor(() => {
      expect(mockWhere).toBeCalledWith(mockInput);
    });
  });

  it('Should orderby against firestore, performances', async () => {
    const mockInput = ['id', 'asc'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: `users/123`,
        queryString: undefined,
        orderString: mockInput,
      }),
    );

    waitFor(() => {
      expect(mockOrderBy).toBeCalledWith(mockInput);
    });
  });

  // TODO: clean up on snapshot change
});
