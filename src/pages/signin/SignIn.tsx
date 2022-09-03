/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

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
import { useFirebaseLogin } from '../../firebase/useFirebaseLogin';
import { ProviderTypes } from '../../firebase/types/AccountTypes';
import { useAuthorizationContext } from '../../context/useAuthorizationContext';
import Modal from 'react-modal';
import firebase from 'firebase';
import { challengeTOP, setUpRecaptcha } from '../../context/AuthorizationContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    maxWidth: '50%',
    maxHeight: '50%',
  },
};

export default function SignIn(): JSX.Element {
  const { login } = useFirebaseLogin();
  const { user, authIsReady } = useAuthorizationContext();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otpNumber, setOTPNumber] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(true);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const buttonStatus = user && authIsReady ? true : false;

  let confirmationResult: any = null;

  function generateStatusElement(): JSX.Element {
    if (user && authIsReady) {
      return <>Authenticated</>;
    }

    return <>Not authenticated</>;
  }

  async function getOTP(e: any) {
    e.preventDefault();

    // TODO: check phone #

    setShowModal(true);

    try {
      confirmationResult = await setUpRecaptcha(phoneNumber);
      console.log(confirmationResult);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={true}
        preventScroll={true}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>SMS One Time Password (OTP)</h2>
        <div className="navbar-modal">
          <div id="recaptcha-container" className="d-flex justify-content-center"></div>

          <label hidden={!showPhoneNumber}>
            <span>Phone Number:</span>
            <input
              required
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={'e.g., 123 456 7891'}
              value={phoneNumber}
            ></input>
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

          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            style={{ width: '100%' }}
            hidden={!showPhoneNumber}
            onClick={async () => {
              setShowPhoneNumber(false);

              try {
                const response = await setUpRecaptcha('+1 201-317-4098');
                console.log(response);

                setShowOTP(true);
              } catch (err) {
                console.log(err);
              }
              //setShowModal(false);
            }}
          >
            Enter Number
          </MDBBtn>

          <MDBBtn
            noRipple
            tag="a"
            href="#!"
            hidden={!showOTP}
            style={{ width: '100%' }}
            onClick={async () => {
              try {
                const res = await challengeTOP(otpNumber, confirmationResult);
                console.log(res);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Enter OTP
          </MDBBtn>
        </div>
      </Modal>

      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Site Authentication</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle} className="tutorials">
                The resources available through the SQAB website are generally publically available
                to all. Certain functionality requires authentication to ensure that authorized
                users have the ability to access and manage their data. Generally, authentication is
                only necessary for those submitting materials for the conference or managing an
                advertisement for graduate student recruitment.
                <br />
                <br />A range of authentication options are presented below:
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
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

              {/**
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
                  login(ProviderTypes.GitHub);
                }}
              >
                Authenticate via GitHub Account
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
                  login(ProviderTypes.Twitter);
                }}
              >
                Authenticate via Twitter Account
              </MDBBtn>
   */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
