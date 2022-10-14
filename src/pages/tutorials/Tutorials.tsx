/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import { TutorialMenu } from './views/TutorialMenu';
import { TutorialVideo } from './views/TutorialVideo';

import './styles/Tutorials.css';

export default function Tutorials(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const showDirectory = id === undefined || id === null || parseInt(id) < 0 ? true : false;

  return (
    <>
      <MDBRow center className='row-eq-height'>
        <MDBCol sm='8'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>SQAB Pre-eminent Tutorials</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className='tutorials'>
                SQAB is committed to simplifying the transition to quantitative behavior analysis
                for students as well as advanced researchers. These videos of presentations from
                leaders in the field are at various levels and are appropriate for individual,
                classroom, and seminar use. Individual video presentations can be accessed by
                clicking on the appropriate links below. All of the videos can be accessed on our{' '}
                <a href='https://www.youtube.com/c/SocietyfortheQuantitativeAnalysesofBehavior'>
                  YouTube channel
                </a>
                .
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm='8'>
          <hr className='additional-margin' />
        </MDBCol>
      </MDBRow>

      <TutorialMenu showDirectory={showDirectory} />

      <TutorialVideo id={id} showDirectory={showDirectory} />
    </>
  );
}
