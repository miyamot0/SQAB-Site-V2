/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from '@testing-library/react';
import { useReducer } from 'react';
import { renderHook, act } from '@testing-library/react-hooks/lib/dom';
import { FirestoreAction, FirestoreState } from '../../interfaces/FirebaseInterfaces';
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

jest.mock('./../../config', () => {
  return {
    projectFirestore: jest.fn(),
    projectAuth: jest.fn(),
    projectFunctions: jest.fn(),
    googleAuthProvider: jest.fn(),
    fbAuthProvider: jest.fn(),
  };
});

let mockAddDocument: jest.Mock<any, any>;
let mockUpdateDocument: jest.Mock<any, any>;
jest.mock('../useFirestore', () => {
  const requireAction = jest.requireActual('../useFirestore');
  mockAddDocument = jest.fn();
  mockUpdateDocument = jest.fn();

  return {
    ...requireAction,
    useFirestore: () => ({
      dispatchIfNotCancelled: jest.fn(),
      updateDocument: mockUpdateDocument,
      addDocument: mockAddDocument,
      response: {} as FirestoreState,
    }),
  };
});

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
  afterEach(() => {
    mockAddDocument.mockClear();
  });

  it('should pass with approximate call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { addDocument } = result.current;

      await addDocument({} as PosterSubmission);

      expect(mockAddDocument).toBeCalled();
    });
  });

  it('should fail with strange call', async () => {
    await act(async () => {
      //mockCollection.mockImplementation(() => ({
      //  add: null,
      //}));

      const { result } = renderHook(() => useFirestore('users'));

      const { addDocument } = result.current;

      await addDocument({} as PosterSubmission);

      expect(mockAddDocument).toBeCalled();
    });
  });
});

describe('useFirestore: Update document', () => {
  afterEach(() => {
    mockUpdateDocument.mockClear();
  });

  it('should pass with approximate call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { updateDocument } = result.current;

      await updateDocument('123', {});

      expect(mockUpdateDocument).toBeCalled();
    });
  });

  it('should fail with strange call', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirestore('users'));

      const { updateDocument } = result.current;

      await updateDocument('123', {});

      expect(mockUpdateDocument).toBeCalled();
    });
  });
});
