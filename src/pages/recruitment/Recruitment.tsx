import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCardText } from 'mdb-react-ui-kit';
import { useFirebaseCollectionTyped } from '../../firebase/useFirebaseCollection';

import RecruitmentTable from './subcomponents/RecruitmentTable';

import './Recruitment.css';
import { RecruitmentAd } from '../../firebase/types/RecordTypes';

export default function Recruitment(): JSX.Element {
  const { documents } = useFirebaseCollectionTyped<RecruitmentAd>('recruitment');

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Current and Upcoming Graduate Student Opportunities</MDBCardTitle>
              <MDBCardText>For those interested in posting an opportunity, please email the current student representative, Tadd Schneider (<a href='mailto:tadd@ku.edu'>tadd@ku.edu</a>), after completing four steps. First, sign in and authenticate to establish an account (see upper right button in the navigation bar). Second, complete your profile so that the student representative can easily identify your account. Third, once you have access to your recruitment call, you will have to contact the student representative and request a review. Lastly, the student representative will approve your ad before it goes live on the site. </MDBCardText>
              {documents && RecruitmentTable(documents)}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
