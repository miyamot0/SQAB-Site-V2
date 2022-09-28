/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../firebase/hooks/useFirestore';
import { useHistory } from 'react-router-dom';
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument';
import {
  InitialUserState,
  UserEditAction,
  UserEditReducer,
} from './functionality/UserProfileFunctionality';
import { IndividualUserRecord } from '../../firebase/types/RecordTypes';
import { OutputUserError } from './views/UserOutputError';
import { UserOutputLoading } from './views/UserOutputLoading';
import { LayoutProfileBody } from './layouts/LayoutProfileBody';
import { RoutedAdminSet } from '../../firebase/types/RoutingTypes';

export default function UserProfile() {
  const history = useHistory();
  const { id } = useParams<RoutedAdminSet>();
  const { document, documentError } = useFirebaseDocumentTyped<IndividualUserRecord>({
    collectionString: 'users',
    idString: id,
  });
  const [state, dispatch] = useReducer(UserEditReducer, InitialUserState);
  const { updateDocument, response } = useFirestore('users');

  useEffect(() => {
    if (document && !state.didBuild) {
      dispatch({ type: UserEditAction.EditDidBuild, payload: true });

      if (document.userPhone) {
        dispatch({
          type: UserEditAction.EditPhoneAuthed,
          payload: document.userPhone.trim().length > 0,
        });
      } else {
        dispatch({ type: UserEditAction.EditPhoneAuthed, payload: false });
      }

      dispatch({ type: UserEditAction.Load, payload: document });
    }
  }, [document]);

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   */
  async function submitCallback(): Promise<void> {
    await updateDocument(id, state);

    if (response.error) {
      alert(response.error);
    } else {
      history.push(`/user/${id}`);
    }

    return;
  }

  if (documentError) {
    return <OutputUserError documentError={documentError} />;
  } else if (!document && !documentError) {
    return <UserOutputLoading />;
  } else {
    return <LayoutProfileBody state={state} submitCallback={submitCallback} dispatch={dispatch} />;
  }
}
