/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { RecruitmentPanel } from '../views/RecruitmentPanel';

export interface RecruitmentDashboardLayout {
  sysAdminFlag: boolean;
  recruitmentReviewFlag: boolean;
}

export function RecruitmentDashboardLayout({
  sysAdminFlag,
  recruitmentReviewFlag,
}: RecruitmentDashboardLayout) {
  if ((sysAdminFlag === false && recruitmentReviewFlag === false)) {
    return <></>;
  }

  return (
    <>
      <MDBRow center>
        <MDBCol sm="8">
          <h4
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Authorization for Recruitment
          </h4>
        </MDBCol>
      </MDBRow>

      <RecruitmentPanel />
    </>
  );
}
