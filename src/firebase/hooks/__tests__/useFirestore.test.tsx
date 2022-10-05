/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useReducer } from 'react';
import { act } from 'react-dom/test-utils';
import { FirestoreAction } from '../../interfaces/FirebaseInterfaces';
import { PosterSubmission } from '../../types/RecordTypes';
import { firestoreReducer, FirestoreStates, useFirestore } from '../useFirestore';
import * as Configs from './../../config';

const mockInitialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

describe('useFirestore', () => {
  it('Should have persisting state', () => {
    const { result } = renderHook(() => useReducer(firestoreReducer, mockInitialState));
    const [state] = result.current;

    expect(mockInitialState).toBe(state);
  });

  it('Should have persisting state if thrown', async () => {
    await act(async () => {
      const { result } = renderHook(() => useReducer(firestoreReducer, mockInitialState));
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.THROW,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitFor(() => {
        expect(result.current[0]).toStrictEqual(mockInitialState);
      });
    });
  });

  it('Response: PENDING', () => {
    act(() => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.PENDING,
        payload: {} as FirestoreAction,
        error: null,
      });

      expect(result.current[0]).toStrictEqual({
        isPending: true,
        document: null,
        success: false,
        error: null,
      });
    });
  });

  it('Response: ADDED', () => {
    act(() => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.ADDED,
        payload: {} as FirestoreAction,
        error: null,
      });

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: {},
        success: true,
        error: null,
      });
    });
  });

  it('Response: DELETED', () => {
    act(() => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.DELETED,
        payload: {} as FirestoreAction,
        error: null,
      });

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: null,
        success: true,
        error: null,
      });
    });
  });

  it('Response: UPDATED', () => {
    act(() => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.UPDATED,
        payload: {} as FirestoreAction,
        error: null,
      });

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: {},
        success: true,
        error: null,
      });
    });
  });

  it('Response: ERROR', () => {
    act(() => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.ERROR,
        payload: {} as FirestoreAction,
        error: null,
      });

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: null,
        success: false,
        error: null,
      });
    });
  });
});

describe('useFirestore: Add document', () => {
  const mockCollection = jest.fn();
  beforeAll(() => {
    const docMock1 = jest.spyOn(Configs.projectFirestore, 'collection');
    docMock1.mockImplementation(mockCollection);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should pass with approximate call', async () => {
    await act(async () => {
      mockCollection.mockImplementation(() => ({
        add: () => Promise.resolve(() => true),
      }));

      const { result } = renderHook(() => useFirestore('users'));

      const { addDocument } = result.current;

      await addDocument({} as PosterSubmission);
    });
  });

  it('should fail with strange call', async () => {
    await act(async () => {
      mockCollection.mockImplementation(() => ({
        add: null,
      }));

      const { result } = renderHook(() => useFirestore('users'));

      const { addDocument } = result.current;

      await addDocument({} as PosterSubmission);
    });
  });
});

describe('useFirestore: Update document', () => {
  const mockCollection = jest.fn();
  beforeAll(() => {
    const docMock1 = jest.spyOn(Configs.projectFirestore, 'collection');
    docMock1.mockImplementation(mockCollection);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should pass with approximate call', async () => {
    await act(async () => {
      mockCollection.mockImplementation(() => ({
        doc: (id: string) => ({
          update: (obj: any) => true,
        }),
      }));

      const { result } = renderHook(() => useFirestore('users'));

      const { updateDocument } = result.current;

      await updateDocument('123', {});
    });
  });

  it('should fail with strange call', async () => {
    await act(async () => {
      mockCollection.mockImplementation(() => ({
        doc: null,
      }));

      const { result } = renderHook(() => useFirestore('users'));

      const { updateDocument } = result.current;

      await updateDocument('123', {});
    });
  });
});
