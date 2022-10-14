/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { PosterPanel } from '../views/PosterPanel';

export interface PosterDashboardLayout {
  sysAdminFlag: boolean;
  submissionReviewFlag: boolean;
}

export function PosterDashboardLayout({
  sysAdminFlag,
  submissionReviewFlag,
}: PosterDashboardLayout) {
  if (sysAdminFlag === false && submissionReviewFlag === false) {
    return <></>;
  }

  return (
    <>
      <MDBRow center>
        <MDBCol sm='8'>
          <h4
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Authorization for Posters
          </h4>
        </MDBCol>
      </MDBRow>

      <PosterPanel />
    </>
  );
}
