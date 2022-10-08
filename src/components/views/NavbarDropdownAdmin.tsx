/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import { MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit';
import { NavbarDropdownFragmentOpen } from './NavbarDropdownFragments';

const navbarTextStyle = { color: 'white' };

export interface NavbarDropdownAdmin {
  user: firebase.User | null;
  authIsReady: boolean;
  studentRecruitFlag: boolean;
  diversityReviewFlag: boolean;
  systemAdministratorFlag: boolean;
  submissionReviewFlag: boolean;
  logoutPending: boolean;
  logout: any;
}

export function NavbarDropdownAdmin({
  user,
  authIsReady,
  studentRecruitFlag,
  diversityReviewFlag,
  systemAdministratorFlag,
  submissionReviewFlag,
  logoutPending,
  logout,
}: NavbarDropdownAdmin) {
  return (
    <MDBNavbarItem className="ml-auto">
      {authIsReady && !user && (
        <MDBNavbarLink
          active
          aria-current="page"
          href="/signin"
          className="mr-2"
          style={navbarTextStyle}
        >
          Log In
        </MDBNavbarLink>
      )}

      {authIsReady && user && logoutPending === false && (
        <NavbarDropdownFragmentOpen
          user={user}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logout={logout}
          submissionReviewFlag={submissionReviewFlag}
        />
      )}

      {authIsReady && user && logoutPending === true && (
        <MDBNavbarLink
          active
          aria-current="page"
          href="#!"
          className="mr-2"
          style={navbarTextStyle}
        >
          Logging Out
        </MDBNavbarLink>
      )}
    </MDBNavbarItem>
  );
}
