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
  MDBTableBody,
  MDBTableHead,
  MDBTable,
} from 'mdb-react-ui-kit';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { RecruitmentAd } from '../recruitment/types/RecruitmentTypes';
import { useFirebaseCollection } from '../../firebase/useFirebaseCollection';
import moment from 'moment';

export default function Administration(): JSX.Element {
  const { documents: recruitmentDocuments } = useFirebaseCollection('recruitment');

  return (
    <>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Review</MDBCardTitle>
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
                  {(recruitmentDocuments as RecruitmentAd[])
                    ? (recruitmentDocuments as RecruitmentAd[])
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
                              <td>{recr.Mentor}</td>
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
                                  onClick={() => true}
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

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Ads to Review</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>...</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
