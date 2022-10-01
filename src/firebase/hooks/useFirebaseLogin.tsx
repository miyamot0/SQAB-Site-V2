/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import { googleAuthProvider, fbAuthProvider, projectAuth } from '../config';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { AuthorizationStates } from '../../context/AuthorizationContext';
import { ProviderTypes } from '../types/AccountTypes';
import firebase from 'firebase';
import { FirebaseLogin } from '../interfaces/FirebaseInterfaces';

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

  /** preFlightObject
   *
   * Construct object to pass along to dispatcher
   *
   * @param {firebase.User | null} user
   * @param {firebase.auth.IdTokenResult} res
   * @returns
   */
  function preFlightObject(user: firebase.User | null, res: firebase.auth.IdTokenResult) {
    return {
      payloadUser: user,
      payloadStudentRecruitmentFlag: res.claims.permissions.Recruitment,
      payloadFlagRecruiter: true,
      payloadFlagSysAdmin: res.claims.permissions.Administration,
      payloadDiversityReviewFlag: res.claims.permissions.Demographics,
    };
  }

  /** handleResult
   *
   * Handle the resulting auth challenge
   *
   * @param {firebase.auth.UserCredential} result
   */
  function handleResult(result: firebase.auth.UserCredential) {
    result.user!.getIdTokenResult().then((res) => {
      dispatch!({
        type: AuthorizationStates.READY,
        ...preFlightObject(result.user, res),
      });
    });
  }

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
            .then((result: firebase.auth.UserCredential) => handleResult(result));
          break;
        case ProviderTypes.Facebook:
          projectAuth
            .signInWithPopup(fbAuthProvider)
            .then((result: firebase.auth.UserCredential) => handleResult(result));
          break;

        case ProviderTypes.Phone:
          confirmResult
            ?.confirm(otpNumber!)
            .then((result: firebase.auth.UserCredential) => handleResult(result));
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
