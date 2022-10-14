/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';
import { CommonHeading } from '../views/CommonHeading';

export function ShowSubmissionsClosed(): JSX.Element {
  return (
    <MDBRow center className='row-eq-height'>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <CommonHeading />

            <MDBCardText style={CardBodyTextStyle}>
              At this point in time <b>submissions are currently closed</b>. Additional information
              will be made available nearer the conference date.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}
