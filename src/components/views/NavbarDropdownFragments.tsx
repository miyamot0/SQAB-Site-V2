/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import { NavbarDropdownLogout } from './NavbarDropdownLogout';

const navbarTextStyle = { color: 'white' };

export interface NavbarDropdownFragmentOpen {
  user: firebase.User;
  studentRecruitFlag: boolean;
  diversityReviewFlag: boolean;
  systemAdministratorFlag: boolean;
  submissionReviewFlag: boolean;
  logout: any;
}

export function NavbarDropdownFragmentOpen({
  user,
  studentRecruitFlag,
  diversityReviewFlag,
  systemAdministratorFlag,
  submissionReviewFlag,
  logout,
}: NavbarDropdownFragmentOpen) {
  const hasAccess =
    studentRecruitFlag || diversityReviewFlag || systemAdministratorFlag || submissionReviewFlag;

  if (hasAccess === true) {
    return (
      <MDBDropdown style={navbarTextStyle}>
        <MDBDropdownToggle tag='a' className='nav-link mr-2'>
          Resources
        </MDBDropdownToggle>

        <MDBDropdownMenu>
          <MDBDropdownItem link href={`/manage/${user.uid}`}>
            Manage Recruitment
          </MDBDropdownItem>

          <MDBDropdownItem link href={'/admin'} data-testid={'administration-link'}>
            Administration
          </MDBDropdownItem>

          <MDBDropdownItem link href={`/poster/${user.uid}`}>
            Manage Poster Submission
          </MDBDropdownItem>
          <MDBDropdownItem link href={`/user/${user.uid}`}>
            Manage Profile
          </MDBDropdownItem>

          <NavbarDropdownLogout logout={logout} />
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  } else {
    return (
      <MDBDropdown style={navbarTextStyle}>
        <MDBDropdownToggle tag='a' className='nav-link mr-2'>
          Resources
        </MDBDropdownToggle>

        <MDBDropdownMenu>
          <MDBDropdownItem link href={`/manage/${user.uid}`}>
            Manage Recruitment
          </MDBDropdownItem>
          <MDBDropdownItem link href={`/poster/${user.uid}`}>
            Manage Poster Submission
          </MDBDropdownItem>
          <MDBDropdownItem link href={`/user/${user.uid}`}>
            Manage Profile
          </MDBDropdownItem>
          <NavbarDropdownLogout logout={logout} />
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}
