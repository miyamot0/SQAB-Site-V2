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
              <MDBCardTitle>Sign In</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="tutorials">
                ...
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

      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>...</MDBCardTitle>
              <MDBBtn
                noRipple
                className="float-right"
                tag="a"
                href="#!"
                onClick={() => {
                  login();
                }}
              >
                Close
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
