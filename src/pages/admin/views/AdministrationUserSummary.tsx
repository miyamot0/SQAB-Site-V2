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
  IndividualUserRecordSaved,
  PosterSubmission,
  RecruitmentAd,
} from '../../../firebase/types/RecordTypes';
import { UserSummaryCard } from './UserSummaryCard';
import { useFirebaseCollectionTyped } from '../../../firebase/hooks/useFirebaseCollection';

export interface AdministrationUserSummary {
  userDocuments: IndividualUserRecordSaved[] | null;
  submissionDocuments: PosterSubmission[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdministrationUserSummary({
  userDocuments,
  submissionDocuments,
}: AdministrationUserSummary) {

  const { documents: recruitmentDocuments } = useFirebaseCollectionTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    queryString: undefined,
    orderString: undefined,
  });


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
