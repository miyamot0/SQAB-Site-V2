/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../config';
import { FirestoreAction, FirestoreState, UseFirestore } from '../interfaces/FirebaseInterfaces';
import { PosterSubmission } from '../types/RecordTypes';

export enum FirestoreStates {
  PENDING = 'PENDING',
  ADDED = 'ADDED',
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
  ERROR = 'ERROR',
  THROW = 'THROW',
}

/** firestoreReducer
 *
 * Reducer firestore interactions
 *
 * @param {Enum} state Current state
 * @param {Object} action Action type
 * @returns {FirestoreState}
 */
export function firestoreReducer(state: FirestoreState, action: FirestoreAction): FirestoreState {
  switch (action.type) {
    case FirestoreStates.PENDING:
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case FirestoreStates.ADDED:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case FirestoreStates.DELETED:
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case FirestoreStates.UPDATED:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case FirestoreStates.ERROR:
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
}

/** useFirestore
 *
 * Core firebase interaction methods
 *
 * @param {string} collection collection address
 * @returns {UseFirestore}
 */
export function useFirestore(collection: string): UseFirestore {
  const [response, dispatch] = useReducer(firestoreReducer, {
    document: null,
    isPending: false,
    error: null,
    success: false,
  });
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(collection);

  // only dispatch is not cancelled
  function dispatchIfNotCancelled(action: FirestoreAction): void {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  /** addDocument
   *
   * add a document
   *
   * @param {PosterSubmission} doc document to upload
   * @returns {Promise<void>}
   */
  async function addDocument(doc: PosterSubmission, uid?: string): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      const createdAt = timestamp.fromDate(new Date());

      if (uid !== null) {
        const addedDocument = await ref.doc(uid).set({ ...doc, createdAt });

        dispatchIfNotCancelled({
          type: FirestoreStates.ADDED,
          payload: addedDocument,
          error: null,
        });
      } else {
        const addedDocument = await ref.add({ ...doc, createdAt });

        dispatchIfNotCancelled({
          type: FirestoreStates.ADDED,
          payload: addedDocument,
          error: null,
        });
      }
    } catch (err: any) {
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: err.message,
      });
    }
  }

  /** updateDocument
   *
   * update a document
   *
   * @param {string} id document address for removal
   * @param {updates} updates object with features to update
   * @returns {Promise<void>}
   */
  async function updateDocument(id: string | undefined | null, updates: any): Promise<void> {
    dispatch({
      type: FirestoreStates.PENDING,
      payload: null,
      error: null,
    });

    try {
      if (id === undefined || id === null) {
        dispatchIfNotCancelled({
          type: FirestoreStates.ERROR,
          payload: null,
          error: 'id is null/undefined',
        });

        return;
      }

      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: FirestoreStates.UPDATED,
        payload: null,
        error: null,
      });
      return updatedDocument;
    } catch (err: any) {
      dispatchIfNotCancelled({
        type: FirestoreStates.ERROR,
        payload: null,
        error: err.message,
      });

      return;
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, updateDocument, response };
}
