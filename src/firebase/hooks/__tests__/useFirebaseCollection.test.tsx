/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from '@testing-library/react-hooks';
import { mockOrderBy, mockWhere } from '../../../../jestSetup';
import { useFirebaseCollectionTyped } from '../useFirebaseCollection';

describe('useFirebaseCollectionTyped', () => {
  beforeEach(() => {
    mockOrderBy.mockClear();
    mockWhere.mockClear();
  });

  /*
  it('Should fail on bogus query', () => {
    const { result, waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'blerg',
        queryString: undefined,
        orderString: undefined,
      }),
    );

    expect(result.error).toBe(true);
  });
  */

  it('Should query against firestore, users, no args', () => {
    const mockInput = ['uid', '=', '123'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: undefined,
        orderString: undefined,
      }),
    );

    expect(mockWhere).toBeCalledTimes(0);
    expect(mockOrderBy).toBeCalledTimes(0);
  });

  it('Should query against firestore, users', () => {
    const mockInput = ['uid', '=', '123'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: mockInput,
        orderString: undefined,
      }),
    );

    expect(mockWhere).toBeCalledTimes(1);
  });

  it('Should orderby against firestore, users', () => {
    const mockInput = ['id', 'asc'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: 'users',
        queryString: undefined,
        orderString: mockInput,
      }),
    );

    expect(mockOrderBy).toBeCalledTimes(1);
  });

  it('Should query against firestore, performances', () => {
    const mockInput = ['uid', '=', '123'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: `users/123`,
        queryString: mockInput,
        orderString: undefined,
      }),
    );

    expect(mockWhere).toBeCalledTimes(1);
  });

  it('Should orderby against firestore, performances', () => {
    const mockInput = ['id', 'asc'];

    const { waitFor } = renderHook(() =>
      useFirebaseCollectionTyped({
        collectionString: `users/123`,
        queryString: undefined,
        orderString: mockInput,
      }),
    );

    expect(mockOrderBy).toBeCalledTimes(1);
  });
});
