/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Bylaws from './../../assets/administration/SQAB_Bylaws_June2018.pdf';
import boardJson from './../../assets/json/board.json';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';

import './styles/ExecutiveBoard.css';

export default function ExecutiveBoard(): JSX.Element {
  return (
    <>
      <MDBRow center>
        <MDBCol sm='8'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Leadership and Executive Board (2021-2022)</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                The Society for the Quantitative Analyses of Behavior is led by a yearly-appointed
                board of executive directors. The contact information for all board members, as well
                as student appointees, is provided below.
                <br />
                <br />
                The most recent copy of the organization&apos;s bylaws are available{' '}
                <a href={Bylaws} className='bylawsLink'>
                  here
                </a>
                .
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center className='justify-content-center'>
        <MDBCol sm='8'>
          <h4
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Current Leadership
          </h4>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm='4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Board Members/Board Directors</MDBCardTitle>
              <ul className='board-ul'>
                {boardJson.Board.map(member => {
                  return (
                    <li key={`board-${member.Name}`}>
                      <p>{`${member.Name}`}</p>
                    </li>
                  );
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md='4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Board Officers</MDBCardTitle>
              <ul className='board-ul'>
                {boardJson.Officers.map(member => {
                  if (member.Role === 'Webmaster') {
                    return (
                      <li key={`board-${member.Name}`}>
                        <a href={`mailto:${member.Contact}`}>{`${member.Name}`}</a>
                      </li>
                    );
                  } else {
                    return (
                      <li key={`board-${member.Name}`}>
                        <p>{`${member.Name}`}</p>
                      </li>
                    );
                  }
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center className='justify-content-center'>
        <MDBCol sm='8'>
          <h4
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Past Leadership
          </h4>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm='4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Past Board Members</MDBCardTitle>
              <ul className='board-ul'>
                {boardJson.PastDirectors.map(member => {
                  return (
                    <li key={`past-board-${member.Name}`}>
                      <p>{`${member.Name}`}</p>
                    </li>
                  );
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md='4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Past President</MDBCardTitle>
              <ul className='board-ul'>
                {boardJson.PastPresident.map(member => {
                  return (
                    <li key={`past-pres-${member.Name}`}>
                      <p>{`${member.Name} (${member.Term})`}</p>
                    </li>
                  );
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
