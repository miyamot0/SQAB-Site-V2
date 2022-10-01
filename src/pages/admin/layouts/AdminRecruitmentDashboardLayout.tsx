/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
  IndividualUserRecordSaved,
  PosterSubmission,
  RecruitmentAd,
} from '../../../firebase/types/RecordTypes';
import { SingleOptionType } from '../../tools/types/GeneralTypes';
import { RecruitmentFunctionality } from '../views/RecruitmentFunctionality';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { toggleRecruitmentStatus } from '../helpers/AdministrationHelpers';

export interface AdminRecruitmentDashboardLayoutInterface {
  sysAdminFlag: boolean;
  recruitmentReviewFlag: boolean;
  userDocuments: IndividualUserRecordSaved[] | null;
  recruitmentDocuments: RecruitmentAd[] | null;
  submissionDocuments: PosterSubmission[] | null;
  selectedAdUser: SingleOptionType;
  userAdArray: SingleOptionType[];
  setSelectedAdUser: (option: SingleOptionType) => void;
}

export function AdminRecruitmentDashboardLayout({
  sysAdminFlag,
  recruitmentReviewFlag,
  userDocuments,
  recruitmentDocuments,
  submissionDocuments,
  selectedAdUser,
  userAdArray,
  setSelectedAdUser,
}: AdminRecruitmentDashboardLayoutInterface) {
  if (!recruitmentDocuments || (sysAdminFlag === false && recruitmentReviewFlag === false)) {
    return <></>;
  }

  const columns: ColumnType[] = [
    { label: 'Mentor', field: 'mentor', sort: 'asc' },
    { label: 'Institution', field: 'institution', sort: 'asc' },
    { label: 'Contact Information', field: 'contact', sort: 'asc' },
    { label: 'Summary of Mentory and Lab', field: 'ad', sort: 'asc' },
    { label: 'Application Deadline', field: 'deadline', sort: 'asc' },
    { label: 'Approved', field: 'approval', sort: 'asc' },
  ];

  const rows = recruitmentDocuments
    .filter((recr) => {
      return (
        recr.Bio.trim().length > 0 &&
        recr.Contact.trim().length > 0 &&
        recr.Cycle.trim().length > 0 &&
        recr.Mentor.trim().length > 0 &&
        recr.Position.trim().length > 0 &&
        recr.Name.trim().length > 0
      );
    })
    .sort((a, b) => {
      if (!a.Cycle || a.Cycle.trim().length === 0) {
        return 1;
      }

      return moment(new Date(a.Cycle), 'DD/MM/YYYY').isAfter(
        moment(new Date(b.Cycle), 'DD/MM/YYYY'),
      )
        ? 1
        : -1;
    })
    .map((userItem) => {
      const ret = {
        mentor: userItem.Mentor,
        institution: userItem.Institution,
        contact: userItem.Contact,
        ad: (
          <a href={`/recruitment/${userItem.id}`} style={{ color: '#7f007f' }}>
            Lab & Mentor Details
          </a>
        ),
        deadline: userItem.Cycle,
        approval: (
          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            style={{
              width: '100%',
            }}
            className={`button-fit-card ${
              userItem.Approved ? 'button-color-override-red' : 'button-color-override-green'
            }`}
            onClick={() => toggleRecruitmentStatus(userItem)}
          >
            {userItem.Approved ? 'Revoke Approval' : 'Approve'}
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
            Authorization for Recruitment
          </h4>
        </MDBCol>
      </MDBRow>

      <RecruitmentFunctionality
        userDocuments={userDocuments}
        recruitmentDocuments={recruitmentDocuments}
        submissionDocuments={submissionDocuments}
        selectedAdUser={selectedAdUser}
        userAdArray={userAdArray}
        setSelectedAdUser={setSelectedAdUser}
      />

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Dashboard</MDBCardTitle>
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
