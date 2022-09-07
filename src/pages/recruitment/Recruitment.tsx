import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useFirebaseCollection } from '../../firebase/useFirebaseCollection';

import RecruitmentTable from './subcomponents/RecruitmentTable';

import './Recruitment.css';

export default function Recruitment(): JSX.Element {
  const { documents } = useFirebaseCollection('recruitment');

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Current and Upcoming Graduate Student Opportunities</MDBCardTitle>

              {documents && RecruitmentTable(documents)}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
