/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { EmailPanel } from '../views/EmailPanel';

export interface AdminEmailDashboardLayout {
  sysAdminFlag: boolean;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdminEmailDashboardLayout({ sysAdminFlag }: AdminEmailDashboardLayout) {
  if (sysAdminFlag === false) {
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
            Email and Correspondence
          </h4>
        </MDBCol>
      </MDBRow>

      <EmailPanel />
    </>
  );
}
