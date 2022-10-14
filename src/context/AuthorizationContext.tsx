/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Authorization context
 */

import React, { createContext, useReducer, useEffect } from 'react';
import firebase from 'firebase/app';
import { projectAuth } from '../firebase/config';
import { AuthorizationContextInterface } from './interfaces/AuthorizationInterfaces';
import { AuthorizationProviderInterface } from './types/AuthorizationTypes';
import { authorizationReducer } from './functionality/AuthorizationBehavior';

export enum AuthorizationStates {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  READY = 'READY',
}

// Context to inherit
export const AuthorizationContext = createContext<AuthorizationContextInterface>({
  user: null,
  authIsReady: false,
  studentRecruitFlag: false,
  diversityReviewFlag: false,
  systemAdministratorFlag: false,
  submissionReviewFlag: false,
  dispatch: undefined,
});

/** setUpRecaptcha
 *
 * @param {string} phoneNumber
 * @returns
 */
export function setUpRecaptcha(
  phoneNumber: string,
  recapchaVerifier: firebase.auth.RecaptchaVerifier,
) {
  return projectAuth.signInWithPhoneNumber(phoneNumber, recapchaVerifier);
}

/** AuthorizationContextProvider
 *
 * Provider for auth state
 *
 * @param {ReactNode} children Current state
 * @returns {AuthorizationContextStateInterface}
 */
export function AuthorizationContextProvider({
  children,
}: AuthorizationProviderInterface): JSX.Element {
  const [state, dispatch] = useReducer(authorizationReducer, {
    user: null,
    authIsReady: false,
    studentRecruitFlag: false,
    systemAdministratorFlag: false,
    diversityReviewFlag: false,
    submissionReviewFlag: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(res => {
          dispatch({
            type: AuthorizationStates.READY,
            payloadUser: user,
            payloadStudentRecruitmentFlag: res.claims.permissions.Recruitment,
            payloadFlagSysAdmin: res.claims.permissions.Administration,
            payloadDiversityReviewFlag: res.claims.permissions.Demographics,
            payloadFlagSubmissionReview: res.claims.permissions.Submissions,
          });
        });
      } else {
        dispatch({
          type: AuthorizationStates.READY,
          payloadUser: user,
          payloadStudentRecruitmentFlag: false,
          payloadFlagSysAdmin: false,
          payloadDiversityReviewFlag: false,
          payloadFlagSubmissionReview: false,
        });
      }

      unsub();
    });
  }, []);

  return (
    <AuthorizationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthorizationContext.Provider>
  );
}
