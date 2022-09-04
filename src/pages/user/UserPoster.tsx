/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * User Recruitment Page
 */

import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseDocument } from '../../firebase/useFirebaseDocument';
import { RoutedAdminSet } from './types/ProfileTypes';
import { useAuthorizationContext } from '../../context/useAuthorizationContext';
import { PosterSubmission } from '../submissions/types/SubmissionTypes';

export default function UserPoster() {
  const { id } = useParams<RoutedAdminSet>();
  const { documentError: docRecErr, document: docRec } = useFirebaseDocument('submissions', id!);
  const { authIsReady } = useAuthorizationContext();
  const [formError, setFormError] = useState<string>('');

  if (!authIsReady) {
    return <></>;
  }

  if (docRecErr) {
    return (
      <div>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Poster Details</MDBCardTitle>
                At present, you currently do not have a poster on record as being submitted. Please
                contact the site administrator.
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }

  if (docRec) {
    const posterObj = docRec as unknown as PosterSubmission;

    return (
      <div>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Poster Details</MDBCardTitle>
                <form>
                  <label>
                    <span>Submitting Author (Edit in Profile):</span>
                    <input required type="text" disabled value={posterObj.name}></input>
                  </label>
                  <label>
                    <span>Corresponding Email (Edit in Profile):</span>
                    <input required type="text" disabled value={posterObj.email}></input>
                  </label>
                  <label>
                    <span>Poster Title:</span>
                    <input required type="text" disabled value={posterObj.title}></input>
                  </label>
                  <label>
                    <span>Poster Abstract:</span>
                    <input required type="text" disabled value={posterObj.abstract}></input>
                  </label>
                  <label>
                    <span>Full Author List:</span>
                    <input required type="text" disabled value={posterObj.list}></input>
                  </label>
                  <label>
                    <span>Student Presenter:</span>
                    <input
                      required
                      type="text"
                      disabled
                      value={posterObj.presenter.toString()}
                    ></input>
                  </label>
                  <label>
                    <span>Status:</span>
                    <input
                      required
                      type="text"
                      disabled
                      value={posterObj.reviewed ? 'Scored' : 'Under Review'}
                    ></input>
                  </label>

                  {formError && <p className="error">{formError}</p>}
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <br></br>
      </div>
    );
  } else {
    return <></>;
  }
}
