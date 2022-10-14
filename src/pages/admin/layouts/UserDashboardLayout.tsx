/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { IndividualUserRecordSaved } from '../../../firebase/types/RecordTypes';
import { UserPanel } from '../views/UserPanel';

export interface UserDashboardLayout {
  sysAdminFlag: boolean;
  userDocuments: IndividualUserRecordSaved[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function UserDashboardLayout({ sysAdminFlag, userDocuments }: UserDashboardLayout) {
  if (!userDocuments || sysAdminFlag === false) {
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
            User Information
          </h4>
        </MDBCol>
      </MDBRow>

      <UserPanel userDocuments={userDocuments} />
    </>
  );
}
