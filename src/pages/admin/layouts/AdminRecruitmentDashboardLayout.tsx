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
              <MDBCardTitle>Recruitment Advertisement Dashboard</MDBCardTitle>
              <MDBTable responsive>
                <MDBTableHead>
                  <tr>
                    <th className="recruitment-table-th" scope="col">
                      Mentor
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Institution
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Contact Information
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Summary of Mentory and Lab
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Application Deadline
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Approved
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {recruitmentDocuments
                    ? recruitmentDocuments
                        .sort((a, b) => {
                          return moment(new Date(a.Cycle), 'DD/MM/YYYY HH:mm:ss').isAfter(
                            moment(new Date(b.Cycle), 'DD/MM/YYYY HH:mm:ss'),
                          )
                            ? 1
                            : -1;
                        })
                        .map((recr) => {
                          return (
                            <tr key={recr.Contact} className="recruitment-table-tr">
                              <td title={recr.id}>{recr.Mentor}</td>
                              <td>{recr.Institution}</td>
                              <td>
                                {' '}
                                <a className="fw-normal mb-1" href={`mailto:${recr.Contact}`}>
                                  {recr.Contact}
                                </a>
                              </td>
                              <td>
                                <a href={`/recruitment/${recr.id}`}>Lab & Mentor Details</a>
                              </td>
                              <td>{recr.Cycle}</td>
                              <td>
                                <MDBBtn
                                  noRipple
                                  tag="a"
                                  href="#!"
                                  style={{
                                    width: '100%',
                                  }}
                                  className={`button-fit-card ${
                                    recr.Approved
                                      ? 'button-color-override-red'
                                      : 'button-color-override-green'
                                  }`}
                                  onClick={() => toggleRecruitmentStatus(recr)}
                                >
                                  {recr.Approved ? 'Click to Disapprove' : 'Click to Approve'}
                                </MDBBtn>
                              </td>
                            </tr>
                          );
                        })
                    : null}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
