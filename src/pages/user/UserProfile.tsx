/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * User Edit Page
 */

import React, { useReducer } from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../firebase/useFirestore';
import { useHistory } from 'react-router-dom';
import { useFirebaseDocument } from '../../firebase/useFirebaseDocument';
import { IndividualUserRecord, RoutedAdminSet } from './types/ProfileTypes';
import {
  InitialUserState,
  UserEditAction,
  UserEditReducer,
} from './functionality/UserFunctionality';

export default function UserProfile() {
  const history = useHistory();
  const { id } = useParams<RoutedAdminSet>();
  const { documentError, document } = useFirebaseDocument('users', id!);
  const [state, dispatch] = useReducer(UserEditReducer, InitialUserState);
  const { updateDocument, response } = useFirestore('users');

  const [phoneAuthed, setPhoneAuthed] = useState<boolean>(false);

  const [formError, setFormError] = useState<string>('');
  const [didBuild, setDidBuild] = useState(false);

  if (document && !didBuild) {
    setDidBuild(true);

    const docObject: IndividualUserRecord = document as unknown as IndividualUserRecord;
    setPhoneAuthed(docObject.userPhone.trim().length > 0);
    dispatch({ type: UserEditAction.Load, payload: docObject });
  }

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   */
  async function handleEditFormSubmit(): Promise<any> {
    setFormError('');

    if (!state.userName) {
      setFormError('Please enter a valid name');
      return;
    }

    if (!state.userInstitution) {
      setFormError('Please enter a valid school name');
      return;
    }

    await updateDocument(id!, state);

    if (response.error) {
      alert(response.error);
    } else {
      history.push('/');
    }

    return null;
  }

  if (documentError) {
    return <div className="error">{documentError}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Edit Profile Information</MDBCardTitle>
              <form>
                <label>
                  <span>User Name (For Display on Ad):</span>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: UserEditAction.Name, payload: e.target.value })
                    }
                    value={state.userName}
                  ></input>
                </label>
                <label>
                  <span>User Email (For Display on Ad):</span>
                  <input
                    required
                    type="email"
                    onChange={(e) =>
                      dispatch({ type: UserEditAction.Email, payload: e.target.value })
                    }
                    value={state.userEmail}
                  ></input>
                </label>
                <label>
                  <span>User Institution (For Display on Ad):</span>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: UserEditAction.Instituation, payload: e.target.value })
                    }
                    value={state.userInstitution}
                  ></input>
                </label>

                {phoneAuthed && (
                  <label>
                    <span>Phone on Record (Only for Phone Login):</span>
                    <input type="text" disabled value={state.userPhone}></input>
                  </label>
                )}

                <MDBBtn
                  noRipple
                  style={{
                    width: '100%',
                    marginBottom: '25px',
                  }}
                  tag="a"
                  href="#!"
                  className="button-fit-card"
                  onClick={() => handleEditFormSubmit()}
                >
                  Edit Profile
                </MDBBtn>

                {formError && <p className="error">{formError}</p>}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <br></br>
    </div>
  );
}
