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

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';

import { useParams } from 'react-router-dom';
import { useFirebaseDocumentTyped } from '../../firebase/useFirebaseDocument';
import { RoutedAdminSet } from './types/ProfileTypes';
import { useAuthorizationContext } from '../../context/useAuthorizationContext';
import { PosterSubmission } from '../../firebase/types/RecordTypes';

export default function UserPoster() {
  const { id } = useParams<RoutedAdminSet>();
  const { document, documentError } = useFirebaseDocumentTyped<PosterSubmission>('submissions', id);
  const { authIsReady } = useAuthorizationContext();

  if (!authIsReady) {
    return <></>;
  }

  if (documentError) {
    return (
      <div>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Poster Details</MDBCardTitle>
                At present, you currently do not have a poster on record as being submitted. If you
                have previously submitted a poster, but it is not shown here, contact the site
                administrator.
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }

  if (document) {
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
                    <input required type="text" disabled value={document.name}></input>
                  </label>
                  <label>
                    <span>Corresponding Email (Edit in Profile):</span>
                    <input required type="text" disabled value={document.email}></input>
                  </label>
                  <label>
                    <span>Poster Title:</span>
                    <input required type="text" disabled value={document.title}></input>
                  </label>
                  <label>
                    <span>Poster Abstract:</span>
                    <textarea required disabled value={document.abstract}></textarea>
                  </label>
                  <label>
                    <span>Full Author List:</span>
                    <textarea required disabled value={document.list}></textarea>
                  </label>
                  <label>
                    <span>Potential Student Presenter:</span>
                    <input
                      required
                      type="text"
                      disabled
                      value={document.presenter.toString()}
                    ></input>
                  </label>
                  <label>
                    <span>Status of Review:</span>
                    <input
                      required
                      type="text"
                      disabled
                      value={document.reviewed ? 'Scored' : 'Under Review'}
                    ></input>
                  </label>
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
