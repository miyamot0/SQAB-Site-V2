/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export function SignInInstructions() {
  return (
    <MDBRow center className='row-eq-height'>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Site Authentication</MDBCardTitle>
            <MDBCardText style={CardBodyTextStyle} className='tutorials'>
              The resources available through the SQAB website are all publically available to all.
              However, certain functionality requires an authentication layer to ensure that users
              have the ability to submit and manage their data (e.g., advertisements for students,
              poster submissions).
              <br />
              <br />
              For most users, authentication will only be necessary when submitting materials to be
              considered for the SQAB conference (e.g., posters). For faculty who wish to use the
              SQAB site for student recruitment, authentication is necessary to allow those users to
              administer their recruitment call.{' '}
              <b>
                Authentication is not required to view tutorials, access tools, or review SQAB
                materials.
              </b>
              <br />
              <br />
              In lieu of a username/password system, the website relies on establishing an identity
              by either referencing common systems (e.g., Google) or via a one-time password linked
              to your phone number (e.g., a SMS message with a 6-digit code). Just as a note,
              message rates may apply for the one-time password option.
              <br />
              <br />A range of different options are presented below; however, it is recommended to
              select a primary method and use that moving forward.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
