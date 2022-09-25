/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { CardBodyTextStyle, CommonModalStyleSignin } from '../../utilities/StyleHelper';
import { useFirebaseLogin } from '../../firebase/hooks/useFirebaseLogin';
import { ProviderTypes } from '../../firebase/types/AccountTypes';
import { useAuthorizationContext } from '../../context/useAuthorizationContext';
import { setUpRecaptcha } from '../../context/AuthorizationContext';
import Modal from 'react-modal';
import PhoneInput from 'react-phone-number-input';
import firebase from 'firebase';

import 'react-phone-number-input/style.css';

export default function SignIn(): JSX.Element {
  const { login } = useFirebaseLogin();
  const history = useHistory();

  const { user, authIsReady } = useAuthorizationContext();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otpNumber, setOTPNumber] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(true);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [confirmResult, setConfirmResult] = useState<firebase.auth.ConfirmationResult>();
  const buttonStatus = user && authIsReady ? true : false;

  let recapchaVerifier: firebase.auth.RecaptchaVerifier;

  if (user && authIsReady) {
    history.push(`/user/${user.uid}`);
  }

  /** generateStatusElement
   *
   * @returns
   */
  function generateStatusElement(): JSX.Element {
    if (user && authIsReady) {
      return <>Authenticated</>;
    }

    return <>Not authenticated</>;
  }

  /** postPhoneEntryCall
   *
   * Set up captcha to confirm human on end
   *
   */
  async function postPhoneEntryCall() {
    setShowPhoneNumber(false);
    recapchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    try {
      setUpRecaptcha(phoneNumber, recapchaVerifier).then((confirmationResult) => {
        setConfirmResult(confirmationResult);
      });

      setShowOTP(true);
    } catch (err) {
      alert(err);
    }
  }

  /** postOTPEntryCall
   *
   * Call to auth obj to challenge codes
   *
   */
  async function postOTPEntryCall() {
    try {
      await login(ProviderTypes.Phone, confirmResult, otpNumber);

      setShowModal(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={false}
        preventScroll={true}
        style={CommonModalStyleSignin}
        contentLabel="Example Modal"
      >
        <h2>Phone Login</h2>

        <button onClick={() => setShowModal(false)} className="button-close-modal">
          X
        </button>

        <div className="navbar-modal">
          <div
            id="captcha-wrapper"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <div id="recaptcha-container"></div>
          </div>

          <label hidden={!showPhoneNumber}>
            <span>Phone Number:</span>
            <PhoneInput
              defaultCountry="US"
              value={phoneNumber}
              onChange={(e: string) => setPhoneNumber(e)}
              placeholder="Enter phone number"
            ></PhoneInput>
          </label>

          <label hidden={!showOTP}>
            <span>One Time Password (OTP):</span>
            <input
              required
              type="text"
              onChange={(e) => setOTPNumber(e.target.value)}
              placeholder={'e.g., 123456'}
              value={otpNumber}
            ></input>
          </label>

          <p>
            You need to enter your phone number, click the captcha, enter the text message that
            arrives after the captcha and click the &quot;Enter OTP&quot; button.
          </p>

          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            style={{ width: '100%' }}
            hidden={!showPhoneNumber}
            onClick={() => postPhoneEntryCall()}
          >
            Enter Number
          </MDBBtn>

          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            hidden={!showOTP}
            style={{ width: '100%' }}
            onClick={() => postOTPEntryCall()}
          >
            Enter OTP
          </MDBBtn>
        </div>
      </Modal>

      <MDBRow center className="row-eq-height">
        <MDBCol sm="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Site Authentication</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="tutorials">
                The resources available through the SQAB website are all publically available to
                all. However, certain functionality requires an authentication layer to ensure that
                users have the ability to submit and manage their data (e.g., advertisements for
                students, poster submissions).
                <br />
                <br />
                For most users, authentication will only be necessary when submitting materials to
                be considered for the SQAB conference (e.g., posters). For faculty who wish to use
                the SQAB site for student recruitment, authentication is necessary to allow those
                users to administer their recruitment call.{' '}
                <b>
                  Authentication is not required to view tutorials, access tools, or review SQAB
                  materials.
                </b>
                <br />
                <br />
                In lieu of a username/password system, the website relies on establishing an
                identity by either referencing common systems (e.g., Google) or via a one-time
                password linked to your phone number (e.g., a SMS message with a 6-digit code). Just
                as a note, message rates may apply for the one-time password option.
                <br />
                <br />A range of different options are presented below; however, it is recommended
                to select a primary method and use that moving forward.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="6">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow center className="row-eq-height center">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Current Status: {generateStatusElement()}</MDBCardTitle>
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                disabled={buttonStatus}
                style={{ width: '100%' }}
                className="button-fit-card"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Authenticate via Text Message
              </MDBBtn>
              <br />
              <br />
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                disabled={buttonStatus}
                style={{ width: '100%' }}
                className="button-fit-card"
                onClick={() => {
                  login(ProviderTypes.Google);
                }}
              >
                Authenticate via Google Account
              </MDBBtn>
              <br />
              <br />
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                disabled={buttonStatus}
                style={{ width: '100%' }}
                className="button-fit-card"
                onClick={() => {
                  login(ProviderTypes.Facebook);
                }}
              >
                Authenticate via Facebook Account
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
