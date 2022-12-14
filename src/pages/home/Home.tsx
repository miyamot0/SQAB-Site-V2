/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Logo from '../../components/Logo';
import CarouselConference from '../../components/CarouselConference';
import CarouselTutorial from '../../components/CarouselTutorial';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';

import './styles/Home.css';

export default function Home(): JSX.Element {
  return (
    <>
      <MDBRow className='d-flex justify-content-center' style={{ paddingBottom: '20px' }}>
        <Logo />
      </MDBRow>

      <MDBRow center className='row-eq-height'>
        <MDBCol sm='4'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Ethics and Diversity Policy</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                The Society for the Quantitative Analyses of Behavior (SQAB) encourages diversity,
                inclusiveness, and freedom from discriminatory behavior in the field of behavioral
                science broadly, and within the organization specifically. Diversity refers to
                differences in race, ethnicity, sexual orientation, gender identity, age, country of
                origin, religious or spiritual beliefs, ability, and social and economic class.
                <br />
                <br />
                The ethics and diversity policy was approved by the SQAB Executive Board in 2018 and
                was based on those developed by ABAI with the approval of ABAI.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol sm='4'>
          <MDBCard style={{ height: '100%' }}>
            <MDBCardBody>
              <MDBCardTitle>Society for the Quantitative Analyses of Behavior</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                The Society for the Quantitative Analyses of Behavior (SQAB) was founded in 1978 by
                M. L. Commons and J. A. Nevin to present and publish material which bring a
                quantitative analysis to bear on the understanding of behavior. A brief history is
                available. The International Society holds its annual meeting in conjunction with
                the Association for Behavior Analysis International (ABAI). Talks at SQAB focus on
                the development and use of mathematical formulations to: characterize one or more
                dimensions of an obtained data set, derive predictions to be compared with data, and
                generate novel data analyses.
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

      <MDBRow className='d-flex justify-content-center'>
        <MDBCol sm='8'>
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <CarouselConference />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody>
                  <MDBCardTitle>2022 Annual Conference</MDBCardTitle>
                  <MDBCardText style={CardBodyTextStyle}>
                    The Society for the Quantitative Analyses of Behavior (SQAB) hosts a yearly
                    conference coinciding with the Annual conference for the Association for
                    Behavior Analysis International (ABAI). Topics span a range of human and
                    non-human experimental research and both paper and poster sessions are offered.
                    <br />
                    <br />
                    Details regarding SQAB 2023 have not yet been finalized. Additional information
                    will be listed on the Annual Conference page in the future.
                  </MDBCardText>
                  <MDBBtn noRipple className='float-right' tag='a' href='/conference'>
                    See Conference Page
                  </MDBBtn>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm='8'>
          <hr className='additional-margin' />
        </MDBCol>
      </MDBRow>

      <MDBRow className='d-flex justify-content-center'>
        <MDBCol sm='8'>
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <CarouselTutorial />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody>
                  <MDBCardTitle>Invited Tutorials</MDBCardTitle>
                  <MDBCardText style={CardBodyTextStyle}>
                    In addition to paper and poster sessions, SQAB arranges for experts in various
                    areas of research to provide introductory tutorials. These are offered as a
                    means for encouraging dissemination of novel methods and approaches.
                  </MDBCardText>
                  <MDBBtn noRipple className='float-right' tag='a' href='/tutorials/-1'>
                    See Recorded Tutorials
                  </MDBBtn>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
