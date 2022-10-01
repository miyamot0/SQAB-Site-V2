/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { projectAuth } from '../config';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { AuthorizationStates } from '../../context/AuthorizationContext';
import { FirebaseLogout } from '../interfaces/FirebaseInterfaces';

/** useFirebaseLogout
 *
 * Hook for logout
 *
 * @returns {FirebaseLogout}
 */
export function useFirebaseLogout(): FirebaseLogout {
  const [logoutCancelled, setLogoutCancelled] = useState(false);
  const [logoutError, setLogoutError] = useState(undefined);
  const [logoutPending, setLogoutPending] = useState(false);

  const { dispatch } = useAuthorizationContext();

  const logout = async () => {
    setLogoutError(undefined);
    setLogoutPending(true);

    if (dispatch === undefined) {
      return;
    }

    try {
      await projectAuth.signOut();

      dispatch({
        type: AuthorizationStates.LOGOUT,
        payloadUser: null,
        payloadStudentRecruitmentFlag: false,
        payloadFlagSysAdmin: false,
        payloadDiversityReviewFlag: false,
        payloadFlagSubmissionReview: false,
      });

      if (!logoutCancelled) {
        setLogoutPending(false);
        setLogoutError(undefined);
      }
    } catch (err: any) {
      if (logoutCancelled === false) {
        setLogoutError(err.message);
        setLogoutPending(false);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    return () => setLogoutCancelled(true);
  }, []);

  return { logout, logoutError, logoutPending };
}
