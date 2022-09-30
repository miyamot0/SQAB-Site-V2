/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
  IndividualUserRecord,
  PosterSubmission,
  RecruitmentAd,
} from '../../../firebase/types/RecordTypes';
import { SingleOptionType } from '../../tools/types/GeneralTypes';
import { RecruitmentLayout } from '../views/RecruitmentLayout';
import { MDBDataTable } from 'mdbreact';
import { ColumnType } from '../types/TableTypes';

export interface AdminDashboardSystemLayoutInterface {
  sysAdminFlag: boolean;
  userDocuments: IndividualUserRecord[] | null;
  recruitmentDocuments: RecruitmentAd[] | null;
  submissionDocuments: PosterSubmission[] | null;
  selectedAdUser: SingleOptionType;
  userAdArray: SingleOptionType[];
  setSelectedAdUser: (option: SingleOptionType) => void;
}

export function AdminDashboardSystemLayout({
  sysAdminFlag,
  userDocuments,
  recruitmentDocuments,
  submissionDocuments,
  selectedAdUser,
  userAdArray,
  setSelectedAdUser,
}: AdminDashboardSystemLayoutInterface) {
  if (userDocuments === null) {
    return <></>;
  }

  const columns: ColumnType[] = [
    { label: 'ID', field: 'id', sort: 'asc' },
    { label: 'Name', field: 'name', sort: 'asc' },
    { label: 'Email', field: 'email', sort: 'asc' },
    { label: 'Ad', field: 'ad', sort: 'asc' },
    { label: 'Permissions', field: 'perms', sort: 'asc' },
  ];

  const rows = userDocuments
    .sort((a, b) => {
      if (!a.userName || a.userName.trim().length === 0) {
        return 1;
      }

      return a.userName.localeCompare(b.userName);
    })
    .map((userItem) => {
      const ret = {
        id: userItem.id ?? '',
        name: userItem.userName,
        email: userItem.userEmail,
        ad: userItem.canPostAd ? 'Yes' : '',
        perms: userItem.perms === 'baseuser' ? '' : userItem.perms,
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

      {sysAdminFlag === true && (
        <RecruitmentLayout
          userDocuments={userDocuments}
          recruitmentDocuments={recruitmentDocuments}
          submissionDocuments={submissionDocuments}
          selectedAdUser={selectedAdUser}
          userAdArray={userAdArray}
          setSelectedAdUser={setSelectedAdUser}
        />
      )}

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>User Database</MDBCardTitle>
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
