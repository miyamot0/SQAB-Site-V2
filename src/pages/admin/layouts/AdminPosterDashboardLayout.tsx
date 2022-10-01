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
} from 'mdb-react-ui-kit';
import { PosterSubmission } from '../../../firebase/types/RecordTypes';
import { togglePosterStatus } from '../helpers/AdministrationHelpers';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';

export interface AdminPosterDashboardLayoutInterface {
  sysAdminFlag: boolean;
  submissionReviewFlag: boolean;
  submissionDocuments: PosterSubmission[] | null;
}

export function AdminPosterDashboardLayout({
  sysAdminFlag,
  submissionReviewFlag,
  submissionDocuments,
}: AdminPosterDashboardLayoutInterface) {
  if (!submissionDocuments || (sysAdminFlag === false && submissionReviewFlag === false)) {
    return <></>;
  }

  const columns: ColumnType[] = [
    { label: 'ID', field: 'id', sort: 'asc' },
    { label: 'Name', field: 'name', sort: 'asc' },
    { label: 'Title', field: 'title', sort: 'asc' },
    { label: 'Email', field: 'email', sort: 'asc' },
    { label: 'Presenter?', field: 'presenter', sort: 'asc' },
    { label: 'Reviewed', field: 'reviewed', sort: 'asc' },
  ];

  const rows = submissionDocuments
    .sort((a, b) => {
      if (!a.name || a.name.trim().length === 0) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    })
    .map((posterItem) => {
      const ret = {
        id: posterItem.id ?? '',
        name: posterItem.name,
        title: posterItem.title,
        email: posterItem.email,
        presenter: posterItem.presenter ? 'Yes' : '',
        reviewed: (
          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            style={{
              width: '100%',
            }}
            className={`button-fit-card ${
              posterItem.reviewed ? 'button-color-override-red' : 'button-color-override-green'
            }`}
            onClick={() => togglePosterStatus(posterItem)}
          >
            {posterItem.reviewed ? 'Revoke Approval' : 'Approve'}
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
