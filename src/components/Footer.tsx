/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import './styles/Footer.css';

export default function Footer() {
  return (
    <MDBFooter
      className='text-center text-lg-left overall-footer'
      style={{ backgroundColor: '#838383' }}
    >
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='8' md='12' className='mb-4 mb-md-0'>
            <h5>About the SQAB website </h5>

            <p>
              This site is built using Material Design for Bootstrap and React and is hosted on
              Google&apos;s firebase service. This site, along with all of the assets/code, is
              available for public inspection at the GitHub account linked below in the repository{' '}
              <a href='https://github.com/miyamot0/SQAB-Site-V2'>SQAB-Site-V2</a> under an{' '}
              <a href='https://raw.githubusercontent.com/miyamot0/SQAB-Site-V2/master/LICENSE'>
                MIT
              </a>{' '}
              license.
            </p>
          </MDBCol>

          <MDBCol lg='4' md='12' className='mb-4 mb-md-0'>
            <h5>Links</h5>

            <ul>
              <li>
                <a href='https://getbootstrap.com/docs/4.0/getting-started/introduction/'>
                  Twitter bootstrap
                </a>
              </li>
              <li>
                <a href='https://mdbootstrap.com/docs/standard/'>Bootstrap Material Design</a>
              </li>
              <li>
                <a href='https://github.com/miyamot0'>Github Repositories</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer className='p-0 pb-4'>
        <MDBRow center>
          <MDBBtn
            noRipple
            className='m-1 btn-facebook'
            href='https://www.facebook.com/Society-for-the-Quantitative-Analyses-of-Behavior-127961307223883/'
            aria-label='Link to facebook account'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            noRipple
            className='m-1 btn-twitter'
            href='https://twitter.com/SQABmedia'
            aria-label='Link to twitter account'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            noRipple
            className='m-1 btn-github'
            href='https://github.com/SQAB-ABAI'
            aria-label='Link to github account'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3 footer-copyright' style={{ backgroundColor: '#515151' }}>
        &copy; Designed by Shawn P. Gilroy{' '}
        <a className='text-dark' href='https://www.smallnstats.com/'>
          www.smallnstats.com
        </a>
      </div>
    </MDBFooter>
  );
}
