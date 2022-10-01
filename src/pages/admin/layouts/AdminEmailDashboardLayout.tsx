/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { EmailStatus } from '../../../firebase/types/RecordTypes';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';

export interface AdminEmailDashboardLayoutInterface {
  sysAdminFlag: boolean;
  mailDocuments: EmailStatus[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdminEmailDashboardLayout({
  sysAdminFlag,
  mailDocuments,
}: AdminEmailDashboardLayoutInterface) {
  if (!mailDocuments || sysAdminFlag === false) {
    return <></>;
  }

  const rows = mailDocuments
    .sort((a, b) => b.delivery.endTime.seconds - a.delivery.endTime.seconds)
    .map((mail) => {
      let template = null;

      if (mail.template && mail.template.name) {
        template = mail.template.name;
      }

      return {
        to: mail.to[0],
        attempts: mail.delivery.attempts,
        state: mail.delivery.state,
        end: mail.delivery.endTime.toDate().toLocaleDateString('en-US'),
        template,
      };
    });

  const columns: ColumnType[] = [
    { label: 'Email', field: 'to', sort: 'asc' },
    { label: 'Template', field: 'template', sort: 'asc' },
    { label: 'End', field: 'end', sort: 'asc' },
    { label: 'State', field: 'state', sort: 'asc' },
  ];

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
            Email and Correspondence
          </h4>
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Email Status Dashboard</MDBCardTitle>
              <MDBDataTable
                exportToCSV
                noBottomColumns
                striped
                data={{
                  columns,
                  rows,
                }}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
