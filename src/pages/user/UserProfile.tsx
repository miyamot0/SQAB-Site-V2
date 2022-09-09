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

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardText,
} from 'mdb-react-ui-kit';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../firebase/useFirestore';
import { useHistory } from 'react-router-dom';
import { useFirebaseDocumentTyped } from '../../firebase/useFirebaseDocument';
import { RoutedAdminSet } from './types/ProfileTypes';
import {
  InitialUserState,
  UserEditAction,
  UserEditReducer,
} from './functionality/UserFunctionality';
import { IndividualUserRecord } from '../../firebase/types/RecordTypes';

export default function UserProfile() {
  const history = useHistory();
  const { id } = useParams<RoutedAdminSet>();
  const { document, documentError } = useFirebaseDocumentTyped<IndividualUserRecord>('users', id);
  const [state, dispatch] = useReducer(UserEditReducer, InitialUserState);
  const { updateDocument, response } = useFirestore('users');

  const [phoneAuthed, setPhoneAuthed] = useState<boolean>(false);

  const [formError, setFormError] = useState<string>('');
  const [didBuild, setDidBuild] = useState(false);

  if (document && !didBuild) {
    setDidBuild(true);

    if (document.userPhone) {
      setPhoneAuthed(document.userPhone.trim().length > 0);
    } else {
      setPhoneAuthed(false);
    }

    dispatch({ type: UserEditAction.Load, payload: document });
  }

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   */
  async function handleEditFormSubmit(): Promise<void> {
    setFormError('');

    if (!state.userName) {
      setFormError('Please enter a valid name');
      return;
    }

    if (!state.userInstitution) {
      setFormError('Please enter a valid school name');
      return;
    }

    await updateDocument(id, state);

    if (response.error) {
      alert(response.error);
    } else {
      history.push(`/user/${id}`);
    }

    return;
  }

  function outputError(): JSX.Element {
    return <MDBCardTitle>{documentError}</MDBCardTitle>;
  }

  function outputLoading(): JSX.Element {
    return <MDBCardTitle>Loading...</MDBCardTitle>;
  }

  function outputBody(): JSX.Element {
    return (
      <>
        <MDBCardTitle>Edit Profile Information</MDBCardTitle>
        <MDBCardText>
          Please complete your profile. In the near future, both recruitment and poster submissions
          will link directly to your profile. At a minimum, please ensure that your name and
          institution are indicated and spelled correctly.
        </MDBCardText>
        <form>
          <label>
            <span>User Name (For Ad/Poster):</span>
            <input
              required
              type="text"
              onChange={(e) => dispatch({ type: UserEditAction.Name, payload: e.target.value })}
              value={state.userName}
            ></input>
          </label>
          <label>
            <span>User Email (For Ad/Poster):</span>
            <input
              required
              type="email"
              onChange={(e) => dispatch({ type: UserEditAction.Email, payload: e.target.value })}
              value={state.userEmail}
            ></input>
          </label>
          <label>
            <span>User Institution (For Ad/Poster):</span>
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
            Save Profile Information
          </MDBBtn>

          {formError && <p className="error">{formError}</p>}
        </form>
      </>
    );
  }

  return (
    <div>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>{document && !documentError ? outputBody() : outputLoading()}</MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <br></br>
    </div>
  );
}
