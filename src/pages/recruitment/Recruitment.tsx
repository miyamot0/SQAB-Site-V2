/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCardText } from 'mdb-react-ui-kit';
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection';
import { RecruitmentAd } from '../../firebase/types/RecordTypes';

import RecruitmentTable from './subcomponents/RecruitmentTable';

import './styles/Recruitment.css';

export default function Recruitment(): JSX.Element {
  const { documents } = useFirebaseCollectionTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    queryString: undefined,
    orderString: undefined,
  });

  return (
    <>
      <MDBRow center className='row-eq-height'>
        <MDBCol sm='8'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Current and Upcoming Graduate Student Opportunities</MDBCardTitle>
              <MDBCardText className='recruitment-card-body'>
                For those registered with the site and interested in posting a recruitment
                opportunity, you should be able to propose an ad by using a link in the upper right
                area of the navigation bar (i.e., Manage Recruitment). If you do not see this
                button, email the current student representative, Tadd Schneider (
                <a href='mailto:tadd@ku.edu'>tadd@ku.edu</a>).
                <br />
                <br />
                <strong>
                  To begin the process of submitting an ad, you must first complete your SQAB
                  profile. You may edit your profile by clicking the link in the upper right area of
                  the navigation bar (i.e., Manage Profile).
                </strong>{' '}
                After you complete your profile fully, and supply the details of the recruitment
                opportunity, you will have to contact the student representative and request a
                review. Your ad will not display immediately after you complete your application.
                The student representative will need to approve your ad before it goes live on the
                site.{' '}
              </MDBCardText>

              <RecruitmentTable documents={documents} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
