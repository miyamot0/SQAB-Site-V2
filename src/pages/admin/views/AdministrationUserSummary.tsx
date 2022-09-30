/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
  IndividualUserRecord,
  PosterSubmission,
  RecruitmentAd,
} from '../../../firebase/types/RecordTypes';
import { UserSummaryCard } from './UserSummaryCard';

export interface AdministrationUserSummaryInterface {
  userDocuments: IndividualUserRecord[] | null;
  recruitmentDocuments: RecruitmentAd[] | null;
  submissionDocuments: PosterSubmission[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdministrationUserSummary({
  userDocuments,
  recruitmentDocuments,
  submissionDocuments,
}: AdministrationUserSummaryInterface) {
  return (
    <MDBRow className="d-flex justify-content-center">
      <MDBCol sm="8">
        <UserSummaryCard
          userDocuments={userDocuments}
          recruitmentDocuments={recruitmentDocuments}
          submissionDocuments={submissionDocuments}
        />
      </MDBCol>
    </MDBRow>
  );
}
