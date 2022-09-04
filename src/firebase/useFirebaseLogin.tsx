/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Firebase login
 */

import { useState, useEffect } from 'react';
import {
  googleAuthProvider,
  githubAuthProvider,
  fbAuthProvider,
  projectAuth,
  twitterAuthProvider,
} from './config';
import { useAuthorizationContext } from '../context/useAuthorizationContext';
import { AuthorizationStates, simplifyPrivilegeAccess } from '../context/AuthorizationContext';
import { ProviderTypes } from './types/AccountTypes';
import firebase from 'firebase';

interface FirebaseLogin {
  login: (
    providerType: ProviderTypes,
    confirmResult?: firebase.auth.ConfirmationResult | undefined,
    otpNumber?: string,
  ) => Promise<void>;
  loginError: string | undefined;
  loginPending: boolean;
}

/** useFirebaseLogin
 *
 * Hook for login
 *
 * @returns {FirebaseLogin}
 */
export function useFirebaseLogin(): FirebaseLogin {
  const [loginCancelled, setLoginCancelled] = useState(false);
  const [loginError, setLoginError] = useState();
  const [loginPending, setPending] = useState(false);

  const { dispatch } = useAuthorizationContext();

  /** login
   *
   * proper login fx
   *
   * @returns {Promise<void>}
   */
  async function login(
    providerType: ProviderTypes,
    confirmResult?: firebase.auth.ConfirmationResult | undefined,
    otpNumber?: string,
  ): Promise<void> {
    setLoginError(undefined);
    setPending(true);

    try {
      switch (providerType) {
        case ProviderTypes.Google:
          projectAuth
            .signInWithPopup(googleAuthProvider)
            .then((result: firebase.auth.UserCredential) => {
              result.user!.getIdTokenResult().then((res) => {
                dispatch({
                  type: AuthorizationStates.READY,
                  payload: result.user,
                  payload2: simplifyPrivilegeAccess(res.claims.level),
                  payload3: res.claims.canPostAd,
                });
              });
            });
          break;
        case ProviderTypes.Facebook:
          projectAuth
            .signInWithPopup(fbAuthProvider)
            .then((result: firebase.auth.UserCredential) => {
              result.user!.getIdTokenResult().then((res) => {
                dispatch({
                  type: AuthorizationStates.READY,
                  payload: result.user,
                  payload2: simplifyPrivilegeAccess(res.claims.level),
                  payload3: res.claims.canPostAd,
                });
              });
            });
          break;

        case ProviderTypes.Phone:
          confirmResult?.confirm(otpNumber!).then((result) => {
            result.user!.getIdTokenResult().then((res) => {
              dispatch({
                type: AuthorizationStates.READY,
                payload: result.user,
                payload2: simplifyPrivilegeAccess(res.claims.level),
                payload3: res.claims.canPostAd,
              });
            });
          });
          break;

        default:
          break;
      }

      if (!loginCancelled) {
        setPending(false);
        setLoginError(undefined);
      }
    } catch (error: any) {
      if (!loginCancelled) {
        setLoginError(error.message);
        setPending(false);
      }
    }
  }

  useEffect(() => {
    return () => setLoginCancelled(true);
  }, []);

  return { login, loginPending, loginError };
}
