/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { RoutedMentor } from '../recruitment/types/RecruitmentTypes';
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument';
import { useParams } from 'react-router-dom';
import { RecruitmentAd } from '../../firebase/types/RecordTypes';

import '../recruitment/styles/Recruitment.css';

export default function MentorPage(): JSX.Element {
  const { id } = useParams<RoutedMentor>();
  const { document } = useFirebaseDocumentTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    idString: id,
  });

  if (document) {
    return (
      <>
        <MDBRow center className='row-eq-height'>
          <MDBCol sm='6'>
            <MDBCard>
              <MDBCardBody className='recruitment-mentor'>
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
                <b>Link to Additional Lab Information: </b>{' '}
                <a href={document.LabLink}>{document.LabLink}</a>
                <br />
                <br />
                <b>Link to Application Information: </b> <a href={document.Link}>{document.Link}</a>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </>
    );
  }

  return <></>;
}
