/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { FirestoreStates } from '../hooks/useFirestore';
import { ProviderTypes } from '../types/AccountTypes';

export interface UseFirebaseDocument {
  document: any | null | undefined;
  documentError: string | undefined;
}

export interface UseFirebaseCollection {
  documents: any[] | null;
  error: string | undefined;
}

export interface CollectionInputInterface {
  collectionString: string;
  queryString: string[] | undefined;
  orderString: string[] | undefined;
}

export interface DocumentInputInterface {
  collectionString: string;
  idString: string | undefined;
}

export interface FirebaseLogin {
  login: (
    providerType: ProviderTypes,
    confirmResult?: firebase.auth.ConfirmationResult | undefined | undefined,
    otpNumber?: string | undefined,
  ) => Promise<void>;
  loginError: string | undefined;
  loginPending: boolean;
}

export interface FirebaseLogout {
  logout: () => Promise<void>;
  logoutError: string | undefined;
  logoutPending: boolean;
}

export interface FirestoreState {
  isPending: boolean;
  document: any;
  success: boolean;
  error: string | null;
}

export interface FirestoreAction {
  type: FirestoreStates;
  payload: any;
  error: string | null;
}

export interface UseFirestore {
  addDocument: (doc: any, uid?: string) => Promise<void>;
  updateDocument: (id: string | undefined | null, updates: any) => Promise<void>;
  response: FirestoreState;
}
