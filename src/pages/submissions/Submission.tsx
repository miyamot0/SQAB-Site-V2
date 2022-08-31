/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';

import CarouselConference from '../../components/CarouselConference';

export default function Submission(): JSX.Element {
  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Submissions for Annual Conference</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Submissions are currently disabled.
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
        <MDBCol sm="4">
          <CarouselConference />
        </MDBCol>
        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Submission Portal</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                The submission portal is currently closed.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
