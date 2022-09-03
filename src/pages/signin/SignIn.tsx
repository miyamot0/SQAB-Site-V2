/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { useParams } from 'react-router-dom';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { useFirebaseLogin } from '../../firebase/useFirebaseLogin';

export default function SignIn(): JSX.Element {
  const { login, loginError, loginPending } = useFirebaseLogin();

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Site Authentication</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="tutorials">
                The resources available through the SQAB website are generally publically available
                to all. Certain functionality requires authentication to ensure that authorized
                users have the ability to access and manage their data. Generally, authentication is
                only necessary for those submitting materials for the conference or managing an
                advertisement for graduate student recruitment.
                <br />
                <br />A range of authentication options are presented below:
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow center className="row-eq-height center">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle></MDBCardTitle>
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                style={{ width: '100%' }}
                className="button-fit-card"
                onClick={() => {
                  login();
                }}
              >
                Authenticate via Google Account
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
