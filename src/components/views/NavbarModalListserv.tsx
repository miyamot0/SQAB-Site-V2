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

export interface NavbarModalListserv {
  modalIsOpen: any;
  setIsOpen: any;
  closeModal: any;
}

export function NavbarModalListserv({ modalIsOpen, setIsOpen, closeModal }: NavbarModalListserv) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      preventScroll={true}
      style={customStyles}
      aria={{ labelledby: 'Close listserv modal' } as Aria}
      contentLabel='Close listserv modal'
    >
      <h2>Listserv</h2>
      <button onClick={() => setIsOpen(false)} className='button-close-modal'>
        X
      </button>
      <div className='navbar-modal'>
        <p>
          SQAB maintains an active listserv with over 400 members. Prospective members may access
          this resource by consulting the following webpage:{' '}
        </p>
        <a
          href='https://mailmanlists.us/mailman/listinfo/sqab'
          style={{ color: 'rgb(127, 0, 127)' }}
        >
          https://mailmanlists.us/mailman/listinfo/sqab
        </a>
        <br />
        <br />

        <p>
          <b>Frequently Asked Questions:</b>
          <br />
          <br />
          <i>Why is there another new listserv?</i>
          <br />
          <br />
          The prior MailMan listserv hosting company no longer operates. Your settings and contact
          information has been migrated to the new location.
          <br />
          <br />
          <i>How does the SQAB listserv work?</i>
          <br />
          <br />
          <i>How is this listserv different?</i>
          <br />
          <br />
          The new listserv is the same as the previous. MailMan does not require an account with
          Yahoo or any other third party. Rather, you simply use an email of your choice and select
          a password. It is good to note that MailMan suggests avoiding the use of
          &apos;valuable&apos; passwords. This is because password changes are sent via email and
          this is not a secure process (i.e., do not use a password also used with sensitive
          accounts).
          <br />
          <br />
          The MailMan service allows readers to (optionally) receive updates in the form of
          &apos;digests.&apos; Digests are a way to get updates from the listserv without receiving
          dozens of updates in the span of a day. That is, a single email digest will provide
          updates to users if so desired. Digests are generally preferred by users who do not wish
          to be receive a notification on their phone or email client following every single
          interaction on the listserv (most users do opt for a digest to avoid this very issue).
          <br />
          <br />
          Various features exist beyond those explicitly noted here and users are encouraged to
          review these settings to customize their individual settings to best match their
          preferences.
          <br />
          <br />
          MailMan has a template-based manner of sending emails and this has a high likelihood of
          being picked up as SPAM (i.e., it can look like unsolicited messaging. As a result, we
          suggest you immediately whitelist this sender from your email client&apos;s SPAM
          filtering.
          <br />
          <br />
          <b>Getting Started:</b>
          <br />
          <br />
          <i>Current Listserv Members</i>
          <br />
          <br />
          You will be sent an invitation to create a password the week before Yahoo Groups closes
          (12/8/20). You will not need to create a new account.
          <br />
          <br />
          <i>Prospective Listserv Members</i>
          <br />
          <br />
          Those interested in participating in the listserv may visit the listserv page for
          information on how to apply to be included on the listserv:{' '}
          <a
            href='https://mailmanlists.us/mailman/listinfo/sqab'
            style={{ color: 'rgb(127, 0, 127)' }}
          >
            https://mailmanlists.us/mailman/listinfo/sqab
          </a>
        </p>
      </div>
    </Modal>
  );
}
