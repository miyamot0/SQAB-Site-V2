/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const mockSignInWithPhoneNumber = jest.fn();

jest.mock('firebase/app', () => {
  const firestoreObj = {
    Timestamp: jest.fn(() => ({
      fromDate: jest.fn(() => ({ seconds: 0, nanoseconds: 0 })),
      new: jest.fn(() => ({ seconds: 0, nanoseconds: 0 })),
    })),
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn(() => Promise.resolve(true)),
    onSnapshot: jest.fn(() => Promise.resolve(true)),
  };
  const firestore = jest.fn(() => firestoreObj);

  const authObjectMock = {
    createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
    signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    signInWithPopup: jest.fn(() => Promise.resolve(true)),
    signInWithPhoneNumber: mockSignInWithPhoneNumber.mockImplementation(() =>
      Promise.resolve(true),
    ),
    fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => {
      Promise.resolve(true);
    }),
    onAuthStateChanged: jest.fn(),
    currentUser: {
      sendEmailVerification: jest.fn(() => Promise.resolve(true)),
    },
  };

  const auth = jest.fn(() => authObjectMock);
  auth.GoogleAuthProvider = jest.fn();
  auth.FacebookAuthProvider = jest.fn();
  auth.RecaptchaVerifier = jest.fn();

  const cloudFunction = jest.fn(() => {
    return Promise.resolve({});
  });
  const httpsCallable = jest.fn(() => cloudFunction);
  const functions = jest.fn(() => ({
    httpsCallable,
  }));

  return {
    initializeApp: jest.fn(),
    firestore,
    auth,
    functions,
  };
});

export { mockSignInWithPhoneNumber };
