/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Modal from 'react-modal';
import { NavbarModalListserv } from './views/NavbarModalListserv';
import { NavbarModalPrivacy } from './views/NavbarModalPrivacy';
import { Navbar } from './views/Navbar';

export default function Header(): JSX.Element {
  const [showBasic, setShowBasic] = useState<boolean>(true);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalIsOpen2, setIsOpen2] = useState<boolean>(false);
  /*
  const { logout, logoutPending } = useFirebaseLogout();
  const { user, authIsReady, studentRecruitFlag, diversityReviewFlag, systemAdministratorFlag } =
    useAuthorizationContext();

    */
  function openModal(): void { setIsOpen(true); }
  function closeModal(): void { setIsOpen(false); }

  function openModal2(): void { setIsOpen2(true); }
  function closeModal2(): void { setIsOpen2(false); }

  function toggleView(): void { setShowBasic(!showBasic); }

  Modal.setAppElement('#root');

  return <>
    <NavbarModalPrivacy modalIsOpen={modalIsOpen}
      setIsOpen={setIsOpen} closeModal={closeModal} />

    <NavbarModalListserv modalIsOpen={modalIsOpen2}
      setIsOpen={setIsOpen2} closeModal={closeModal2} />

    <Navbar toggleView={toggleView} showBasic={showBasic}
      openModal={openModal} openModal2={openModal2} />
  </>;
}
