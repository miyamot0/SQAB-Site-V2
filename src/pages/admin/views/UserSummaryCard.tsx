/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit';
import {
  IndividualUserRecordSaved,
  PosterSubmission,
  RecruitmentAd,
} from '../../../firebase/types/RecordTypes';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export interface UserSummaryCardInterface {
  userDocuments: IndividualUserRecordSaved[] | null;
  recruitmentDocuments: RecruitmentAd[] | null;
  submissionDocuments: PosterSubmission[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function UserSummaryCard({
  userDocuments,
  recruitmentDocuments,
  submissionDocuments,
}: UserSummaryCardInterface) {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Administrative Summary</MDBCardTitle>
        <MDBCardText style={CardBodyTextStyle}>
          <b>Total Users:</b> {userDocuments ? userDocuments.length : 0} users currently registered
          <br />
          <br />
          <b>Total Recruitment Ads:</b> {recruitmentDocuments ? recruitmentDocuments.length : 0}{' '}
          recruitment entries (either complete or in-progress)
          <br />
          <br />
          <b>Total Poster Submissions:</b> {submissionDocuments ? submissionDocuments.length : 0}{' '}
          posters submitted and either approved or under review
          <br />
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}
