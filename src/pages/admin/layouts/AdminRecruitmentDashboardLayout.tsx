/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import moment from 'moment';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { RecruitmentAd } from '../../../firebase/types/RecordTypes';
import { toggleRecruitmentStatus } from '../helpers/AdministrationHelpers';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';

export interface AdminRecruitmentDashboardLayoutInterface {
  recruitmentDocuments: RecruitmentAd[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdminRecruitmentDashboardLayout({
  recruitmentDocuments,
}: AdminRecruitmentDashboardLayoutInterface) {
  if (!recruitmentDocuments) {
    return <></>;
  }

  const columns: ColumnType[] = [
    //{ label: 'ID', field: 'id', sort: 'asc' },
    { label: 'Mentor', field: 'mentor' },
    { label: 'Contact Information', field: 'email' },
    { label: 'Institution', field: 'institution' },
    { label: 'Application Deadline', field: 'cycle', sort: 'asc' },
    { label: 'Summary of Mentory and Lab', field: 'link' },
    { label: 'Approved', field: 'approved' },
  ];

  const rows = recruitmentDocuments
    .sort((a, b) => {
      if (!a.Cycle || a.Cycle.trim().length === 0) {
        return 1;
      }
      return moment(new Date(a.Cycle), 'DD/MM/YYYY HH:mm:ss').isAfter(
        moment(new Date(b.Cycle), 'DD/MM/YYYY HH:mm:ss'),
      )
        ? 1
        : -1;
    })
    .map((recr) => {
      const ret = {
        //id: recr.id,
        mentor: recr.Mentor,
        email: recr.Contact,
        institution: recr.Institution,
        cycle: recr.Cycle,
        link: <a href={`/recruitment/${recr.id}`}>Link to Page</a>,
        approved: (
          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            style={{
              width: '100%',
            }}
            className={`button-fit-card ${
              recr.Approved ? 'button-color-override-red' : 'button-color-override-green'
            }`}
            onClick={() => toggleRecruitmentStatus(recr)}
          >
            {recr.Approved ? 'Disapprove' : 'Approve'}
          </MDBBtn>
        ),
      };

      return ret;
    });

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
            Current Recruitment Submissions
          </h4>
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Database</MDBCardTitle>
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
