/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {
  IndividualUserRecord,
  PosterSubmission,
  RecruitmentAd,
} from '../../../firebase/types/RecordTypes';
import { AdministrationRecruitmentGenerator } from './AdministrationRecruitmentGenerator';
import { CardBodyTextStyle } from '../../../utilities/StyleHelper';
import { SingleOptionType } from '../../tools/types/GeneralTypes';

export interface RecruitmentFunctionalityInterface {
  userDocuments: IndividualUserRecord[] | null;
  recruitmentDocuments: RecruitmentAd[] | null;
  submissionDocuments: PosterSubmission[] | null;
  selectedAdUser: SingleOptionType;
  userAdArray: SingleOptionType[];
  setSelectedAdUser: (option: SingleOptionType) => void;
}

export function RecruitmentFunctionality({
  selectedAdUser,
  userAdArray,
  setSelectedAdUser,
}: RecruitmentFunctionalityInterface) {
  return (
    <MDBRow className="d-flex justify-content-center">
      <MDBCol sm="4">
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Recruitment Settings/Options</MDBCardTitle>
            <MDBCardText style={CardBodyTextStyle}>
              From this dashboard, authorized users can perform two primary roles related to the
              recruitment panel. One, authorized users can supply privileges to registered users
              related to managing a recruitmend ad. By default, typical users can only submit
              posters via the website. This permission can be granted using the dropdown and button
              included in the &quot;Create Recruitment Entry&quot; panel. Two, recently created ads
              are naturally not going to be ready for display on the site and will require review.
              The &quot;Recruitment Advertisement Dashboard&quot; allows authorized users to view
              the current status of an ad, and if deemed ready, can click to approve the add for
              display. However, at any time, authorized users can choose to disapprove the add
              (e.g., the interval has lapsed).
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <AdministrationRecruitmentGenerator
        selectedAdUser={selectedAdUser}
        userAdArray={userAdArray}
        setSelectedAdUser={setSelectedAdUser}
      />
    </MDBRow>
  );
}
