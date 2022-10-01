/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';

import specialIssueJson from './../../assets/json/specialissues.json';

import './styles/BeProcInformation.css';

export default function BeProcInformation(): JSX.Element {
  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>
                Special Issues from The Society for the Quantitative Analyses of Behavior
              </MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Special Issues are available through Open Access complements of Elsevier for six
                months following conference proceedings.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Available Issues</MDBCardTitle>
              <ul className="beproc-ul">
                {specialIssueJson.Specials.map((issue) => {
                  return (
                    <li key={`index-${issue.Title}`}>
                      <a
                        href={`http://www.sciencedirect.com/science/journal/03766357/${issue.Volume}/${issue.Issue}/`}
                      >
                        <span>
                          {`Proceedings of SQAB ${issue.Year}: ${issue.Title}, Behavioural Processes, ${issue.Volume}(${issue.Issue}), ${issue.Pages}`}
                        </span>
                      </a>
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
