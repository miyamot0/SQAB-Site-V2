import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';

import './Recruitment.css';
import { RoutedMentor } from './types/RecruitmentTypes';
import { useFirebaseDocument } from '../../firebase/useFirebaseDocument';
import { useParams } from 'react-router-dom';

export default function MentorPage(): JSX.Element {
  const { id } = useParams<RoutedMentor>();
  const { document } = useFirebaseDocument('recruitment', id);

  if (document) {
    return (
      <>
        <MDBRow center className="row-eq-height">
          <MDBCol sm="6">
            <MDBCard>
              <MDBCardBody className="recruitment-mentor">
                <MDBCardTitle>
                  {document.Name} ({document.Institution})
                </MDBCardTitle>
                <b>Position Offered: </b> {document.Position}
                <br />
                <br />
                <b>Mentor Biography: </b> {document.Bio}
                <br />
                <br />
                <b>Position Description: </b> {document.Description}
                <br />
                <br />
                <b>Deadline for Applications: </b> {document.Cycle}
                <br />
                <br />
                <b>Link to Application/Institution Information: </b>{' '}
                <a href={document.Link}>Link</a>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </>
    );
  }

  return <></>;
}
