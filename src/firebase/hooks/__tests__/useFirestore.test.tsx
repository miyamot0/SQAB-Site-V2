/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { waitFor } from '@testing-library/react';
import { useReducer } from 'react';
import { renderHook, act } from '@testing-library/react-hooks/lib/dom';
import { FirestoreAction } from '../../interfaces/FirebaseInterfaces';
import { PosterSubmission } from '../../types/RecordTypes';
import { firestoreReducer, useFirestore } from '../useFirestore';

const mockInitialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

enum FirestoreStates {
  PENDING = 'PENDING',
  ADDED = 'ADDED',
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
  ERROR = 'ERROR',
  THROW = 'THROW',
}

describe('firestoreReducer', () => {
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
      }),
        await waitFor(() => {
          expect(result.current[0]).toStrictEqual(mockInitialState);
        });
    });
  });

  it('Response: PENDING', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, {
          ...mockInitialState,
          isPending: false,
        }),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.PENDING,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0].isPending);

      expect(result.current[0]).toStrictEqual({
        isPending: true,
        document: null,
        success: false,
        error: null,
      });
    });
  });

  it('Response: ADDED', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, {
          ...mockInitialState,
          success: false,
        }),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.ADDED,
        payload: { id: '123' },
        error: null,
      } as FirestoreAction);

      await waitForValueToChange(() => result.current[0].success);

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: { id: '123' },
        success: true,
        error: null,
      });
    });
  });

  it('Response: DELETED', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, mockInitialState),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.DELETED,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0].success);

      expect(result.current[0]).toStrictEqual({
        isPending: false,
        document: null,
        success: true,
        error: null,
      });
    });
  });

  it('Response: UPDATED', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(firestoreReducer, {
          ...mockInitialState,
          success: false,
        }),
      );
      const [, dispatch] = result.current;

      dispatch({
        type: FirestoreStates.UPDATED,
        payload: {} as FirestoreAction,
        error: null,
      });

      await waitForValueToChange(() => result.current[0].success);

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
      const { result } = renderHook(() => useReducer(firestoreReducer, mockInitialState));
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
  it('should pass with approximate call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { addDocument } = result.current;

      const poster = {
        name: 'string',
        title: 'string',
        email: 'string',
        abstract: 'string',
        list: 'string',
        time: firebase.firestore.Timestamp.fromDate(new Date()),
        presenter: false,
        reviewed: false,
        id: undefined,
      } as PosterSubmission;

      await addDocument(poster, '123');
    });
  });

  it('should fail with strange call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { addDocument } = result.current;

      const poster = {
        name: 'string',
        title: 'string',
        email: 'string',
        abstract: 'string',
        list: 'string',
        time: firebase.firestore.Timestamp.fromDate(new Date()),
        presenter: false,
        reviewed: false,
        id: undefined,
      } as PosterSubmission;

      await addDocument(poster, undefined);
    });
  });
});

describe('useFirestore: Update document', () => {
  it('should pass with approximate call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { updateDocument } = result.current;

      const poster = {
        name: 'string',
        title: 'string',
        email: 'string',
        abstract: 'string',
        list: 'string',
        time: firebase.firestore.Timestamp.fromDate(new Date()),
        presenter: false,
        reviewed: false,
        id: undefined,
      } as PosterSubmission;

      await updateDocument('123', poster);
    });
  });

  it('should fail with strange call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { updateDocument } = result.current;

      const poster = {
        name: 'string',
        title: 'string',
        email: 'string',
        abstract: 'string',
        list: 'string',
        time: firebase.firestore.Timestamp.fromDate(new Date()),
        presenter: false,
        reviewed: false,
        id: undefined,
      } as PosterSubmission;

      await updateDocument(null, poster);
      await updateDocument(undefined, poster);
    });
  });
});
