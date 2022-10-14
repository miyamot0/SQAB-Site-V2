/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Modal, { Aria } from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '50%',
    maxHeight: '50%',
  },
};

export interface NavbarModalPrivacy {
  modalIsOpen: any;
  setIsOpen: any;
  closeModal: any;
}

export function NavbarModalPrivacy({ modalIsOpen, setIsOpen, closeModal }: NavbarModalPrivacy) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      preventScroll={true}
      style={customStyles}
      aria={{ labelledby: 'Close privacy modal' } as Aria}
      contentLabel='Example Modal'
    >
      <h2>Privacy</h2>
      <button onClick={() => setIsOpen(false)} className='button-close-modal'>
        X
      </button>
      <div className='navbar-modal'>
        <p className='navbar-modal-p'>
          This site uses no cookies and performs no tracking. Various calculators are provided to
          perform certain analyses, though none of this information is ever saved. Nearly all of the
          calculations are performed without ever leaving your machine. There is some logging (i.e.,
          diagnostic) performed by the server host, though this information is necessary for regular
          functioning and is regularly disposed over within the shortest intervals permitted.
        </p>
      </div>
    </Modal>
  );
}
