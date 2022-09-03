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
import { googleAuthProvider, projectAuth } from './config';
import { useAuthorizationContext } from '../context/useAuthorizationContext';
import { AuthorizationStates } from '../context/AuthorizationContext';

interface FirebaseLogin {
  login: () => Promise<void>;
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
  async function login(): Promise<void> {
    setLoginError(undefined);
    setPending(true);

    try {
      //const loginResult = await projectAuth.signInWithEmailAndPassword(email, password);

      projectAuth.signInWithPopup(googleAuthProvider).then((result) => {
        var credential = result.credential;
        var user = result.user;

        dispatch({
          type: AuthorizationStates.LOGIN,
          payload: result.user,
        });
      });

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
