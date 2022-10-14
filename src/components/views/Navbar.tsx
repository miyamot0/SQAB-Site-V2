/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBIcon,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { useFirebaseLogout } from '../../firebase/hooks/useFirebaseLogout';
import { NavbarDropdownAdmin } from './NavbarDropdownAdmin';

export interface Navbar {
  toggleView: any;
  showBasic: boolean;
  openModal: any;
  openModal2: any;
}

export function Navbar({ toggleView, showBasic, openModal, openModal2 }: Navbar) {
  const navbarTextStyle = { color: 'white' };

  const { logout, logoutPending } = useFirebaseLogout();
  const {
    user,
    authIsReady,
    studentRecruitFlag,
    diversityReviewFlag,
    systemAdministratorFlag,
    submissionReviewFlag,
  } = useAuthorizationContext();

  return (
    <>
      <MDBNavbar expand='sm md lg xl xxl' style={{ backgroundColor: '#7f007f' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/' style={navbarTextStyle}>
            SQAB
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation bar'
            onClick={toggleView}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBDropdown style={navbarTextStyle}>
                  <MDBDropdownToggle tag='a' className='nav-link mr-2'>
                    Conference
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link href='/conference'>
                      Annual Conference
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/tutorials/-1'>
                      Recorded Tutorials
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/registration'>
                      Registration
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/submission'>
                      Submissions
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/records'>
                      Programs and Newsletters
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown style={navbarTextStyle}>
                  <MDBDropdownToggle tag='a' className='nav-link mr-2'>
                    Resources
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link href='/demand'>
                      Demand Curve Analyzer
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/discounting'>
                      Discounting Model Selector
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/pmax'>
                      Exact Solution P<sub>MAX</sub>
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/resources'>
                      Resource Links
                    </MDBDropdownItem>
                    <MDBDropdownItem link href='/behavioralprocesses'>
                      Behavioral Processes Issues
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  active
                  aria-current='page'
                  href='/executiveboard'
                  className='mr-2'
                  style={navbarTextStyle}
                >
                  Leadership
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  active
                  aria-current='page'
                  href='/recruitment'
                  className='mr-2'
                  style={navbarTextStyle}
                >
                  Recruitment
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  active
                  aria-current='page'
                  href='#!'
                  classID='open-modal-header-2'
                  onClick={() => openModal2()}
                  aria-label='Open listserv modal'
                  className='mr-2'
                  style={navbarTextStyle}
                >
                  Listserv
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  active
                  aria-current='page'
                  href='#!'
                  classID='open-modal-header-1'
                  onClick={() => openModal()}
                  aria-label='Open privacy modal'
                  className='mr-2'
                  style={navbarTextStyle}
                >
                  Privacy
                </MDBNavbarLink>
              </MDBNavbarItem>

              <NavbarDropdownAdmin
                user={user}
                authIsReady={authIsReady}
                studentRecruitFlag={studentRecruitFlag}
                diversityReviewFlag={diversityReviewFlag}
                systemAdministratorFlag={systemAdministratorFlag}
                logoutPending={logoutPending}
                logout={logout}
                submissionReviewFlag={submissionReviewFlag}
              />
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
