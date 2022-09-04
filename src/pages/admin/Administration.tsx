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
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';

import Logo from '../../components/Logo';
import CarouselConference from '../../components/CarouselConference';
import CarouselTutorial from '../../components/CarouselTutorial';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';

export default function Administration(): JSX.Element {
  return (
    <>
      <MDBRow className="d-flex justify-content-center" style={{ paddingBottom: '20px' }}>
        <Logo />
      </MDBRow>

      <MDBRow center className="row-eq-height">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>...</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>...</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <CarouselConference />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody>
                  <MDBCardTitle>...</MDBCardTitle>
                  <MDBCardText style={CardBodyTextStyle}>...</MDBCardText>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <CarouselConference />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody>
                  <MDBCardTitle>...</MDBCardTitle>
                  <MDBCardText style={CardBodyTextStyle}>...</MDBCardText>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
