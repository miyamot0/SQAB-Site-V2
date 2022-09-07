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

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import firebase from 'firebase/app';
import { projectAuth } from '../firebase/config';

export enum AuthorizationStates {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  READY = 'READY',
}

export interface AuthorizationContextInterface {
  user: firebase.User | null;
  authIsReady: boolean;
  adminFlag: boolean;
  sysAdminFlag: boolean;
  adFlag: boolean;
  dispatch: LoginDispatch | undefined;
}

export interface AuthorizationContextStateInterface {
  user: firebase.User | null;
  authIsReady: boolean;
  adminFlag: boolean;
  sysAdminFlag: boolean;
  adFlag: boolean;
}

interface FirebaseLoginAction {
  type: AuthorizationStates;
  payloadUser: firebase.User | null;
  payloadFlagAdmin: boolean;
  payloadFlagRecruiter: boolean;
  payloadFlagSysAdmin: boolean;
}

export type Props = {
  children: ReactNode;
};

type LoginDispatch = (arg: FirebaseLoginAction) => void;

// Context to inherit
export const AuthorizationContext = createContext<AuthorizationContextInterface>({
  user: null,
  authIsReady: false,
  adFlag: false,
  adminFlag: false,
  sysAdminFlag: false,
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

/** simplifyPrivilegeAccess
 *
 * Simplify access to privilege level
 *
 * @param {string} res level
 * @returns {bool}
 */
export function simplifySysPrivilegeAccess(res: string): boolean {
  return res === 'sysadmin';
}

/** simplifyPrivilegeAccess
 *
 * Simplify access to privilege level
 *
 * @param {string} res level
 * @returns {bool}
 */
export function simplifyPrivilegeAccess(res: string): boolean {
  return res === 'admin' || res === 'sysadmin';
}

/** Auth reducer
 *
 * Reducer firestore login
 *
 * @param {Enum} state Current state
 * @param {Object} action Action type
 * @returns {AuthorizationContextStateInterface}
 */
export function authReducer(
  state: AuthorizationContextStateInterface,
  action: FirebaseLoginAction,
): AuthorizationContextStateInterface {
  switch (action.type) {
    case AuthorizationStates.LOGIN:
      return {
        ...state,
        user: action.payloadUser,
        authIsReady: false,
        adminFlag: action.payloadFlagAdmin,
        adFlag: action.payloadFlagRecruiter,
        sysAdminFlag: action.payloadFlagSysAdmin,
      };
    case AuthorizationStates.LOGOUT:
      return { ...state, user: null, adminFlag: false, adFlag: false, sysAdminFlag: false };
    case AuthorizationStates.READY:
      return {
        user: action.payloadUser,
        authIsReady: true,
        adminFlag: action.payloadFlagAdmin,
        adFlag: action.payloadFlagRecruiter,
        sysAdminFlag: action.payloadFlagSysAdmin,
      };
    default:
      return state;
  }
}

/** AuthorizationContextProvider
 *
 * Provider for auth state
 *
 * @param {ReactNode} children Current state
 * @returns {AuthorizationContextStateInterface}
 */
export function AuthorizationContextProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    adminFlag: false,
    adFlag: false,
    sysAdminFlag: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((res) => {
          dispatch({
            type: AuthorizationStates.READY,
            payloadUser: user,
            payloadFlagAdmin: simplifyPrivilegeAccess(res.claims.level),
            payloadFlagRecruiter: res.claims.canPostAd,
            payloadFlagSysAdmin: simplifySysPrivilegeAccess(res.claims.level),
          });
        });
      } else {
        dispatch({
          type: AuthorizationStates.READY,
          payloadUser: user,
          payloadFlagAdmin: false,
          payloadFlagRecruiter: false,
          payloadFlagSysAdmin: false,
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
