/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { IndividualUserRecord } from '../../../firebase/types/RecordTypes';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';

export interface AdminDiversityDashboardLayoutInterface {
  sysAdminFlag: boolean;
  userDocuments: IndividualUserRecord[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdminDiversityDashboardLayout({
  sysAdminFlag,
  userDocuments,
}: AdminDiversityDashboardLayoutInterface) {
  if (!userDocuments || sysAdminFlag === false) {
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
            Demographic Information
          </h4>
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>STUBBED</MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
