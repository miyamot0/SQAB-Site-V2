/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { PosterSubmission } from '../../../firebase/types/RecordTypes';
import { togglePosterStatus } from '../helpers/AdministrationHelpers';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export interface AdminPosterDashboardLayoutInterface {
  submissionDocuments: PosterSubmission[] | null;
}

export function AdminPosterDashboardLayout({
  submissionDocuments,
}: AdminPosterDashboardLayoutInterface) {
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
            Authorization for Posters
          </h4>
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Poster Submissions and Review</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Throughout the application cycle, poster submissions will be received through the
                website. Authorized users can view these submissions via the table provided below.
                This serves three core functions; first, the table facilitates review and decisions
                related to posters. That is, administrative decisions regarding posters can be
                logged and recorded via the click of a respective button (see row). Two, once
                decisions are rendered for all posters after the deadline, the site will facilitate
                the sending of emails regarding decisions. Three, the final results of the table can
                be downloaded to support their incorporation into conference materials.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Poster Submission Functionality</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>Please see the options below:</MDBCardText>
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                style={{ width: '100%' }}
                className="button-fit-card"
                disabled
                onClick={() => true}
              >
                Send Confirmation Emails
              </MDBBtn>
              <br />
              <br />
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                style={{ width: '100%' }}
                className="button-fit-card"
                disabled
                onClick={() => true}
              >
                Download Results to File
              </MDBBtn>
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
              <MDBCardTitle>Poster Management Dashboard</MDBCardTitle>
              <MDBTable responsive>
                <MDBTableHead>
                  <tr>
                    <th className="recruitment-table-th" scope="col">
                      Name
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Email
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Title
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Abstract
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Student Presenter
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Link to Entry
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Decision
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {submissionDocuments
                    ? submissionDocuments.map((poster) => {
                        return (
                          <tr key={poster.name} className="recruitment-table-tr">
                            <td>{poster.name}</td>
                            <td>
                              <a href={`mailto:${poster.email}`}>{poster.email}</a>
                            </td>
                            <td>{poster.title}</td>
                            <td>{poster.abstract}</td>
                            <td>{poster.presenter ? 'Interested' : 'Not Interested'}</td>
                            <td>
                              <a href={`/poster/${poster.id}`}>Submission</a>
                            </td>
                            <td>
                              <MDBBtn
                                noRipple
                                tag="a"
                                href="#!"
                                style={{
                                  width: '100%',
                                }}
                                className={`button-fit-card ${
                                  poster.reviewed
                                    ? 'button-color-override-red'
                                    : 'button-color-override-green'
                                }`}
                                onClick={() => togglePosterStatus(poster)}
                              >
                                {poster.reviewed ? 'Click to Disapprove' : 'Click to Accept'}
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
