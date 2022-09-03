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
import { AuthorizationStates } from '../context/AuthorizationContext';
import { ProviderTypes } from './types/AccountTypes';
import firebase from 'firebase';

interface FirebaseLogin {
  login: (providerType: ProviderTypes, recaptchaV?: any) => Promise<void>;
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

  function setUpRecaptcha() {}

  /** login
   *
   * proper login fx
   *
   * @returns {Promise<void>}
   */
  async function login(providerType: ProviderTypes, recaptchaV?: any): Promise<void> {
    setLoginError(undefined);
    setPending(true);

    try {
      switch (providerType) {
        case ProviderTypes.Google:
          projectAuth.signInWithPopup(googleAuthProvider).then((result) => {
            //var credential = result.credential;
            //var user = result.user;

            dispatch({
              type: AuthorizationStates.LOGIN,
              payload: result.user,
            });
          });
          break;
        case ProviderTypes.Facebook:
          projectAuth.signInWithPopup(fbAuthProvider).then((result) => {
            //var credential = result.credential;
            //var user = result.user;

            dispatch({
              type: AuthorizationStates.LOGIN,
              payload: result.user,
            });
          });
          break;
        case ProviderTypes.GitHub:
          projectAuth.signInWithPopup(githubAuthProvider).then((result) => {
            //var credential = result.credential;
            //var user = result.user;

            dispatch({
              type: AuthorizationStates.LOGIN,
              payload: result.user,
            });
          });
          break;
        case ProviderTypes.Twitter:
          projectAuth.signInWithPopup(twitterAuthProvider).then((result) => {
            dispatch({
              type: AuthorizationStates.LOGIN,
              payload: result.user,
            });
          });
          break;

        case ProviderTypes.Phone:
          /*
          const phoneNumber = '+1 201-317-4098';
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, recaptchaV)
            .then((confirmationResult) => {
              console.log(confirmationResult);
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              //window.confirmationResult = confirmationResult;
              // ...
            });
            */

          break;

        default:
          break;
      }

      if (!loginCancelled) {
        setPending(false);
        setLoginError(undefined);
      }
    } catch (error: any) {
      console.log(error);
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
