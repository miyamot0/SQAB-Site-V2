/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Modal from 'react-modal';
import PhoneInput from 'react-phone-number-input';
import { MDBBtn } from "mdb-react-ui-kit";
import { CommonModalStyleSignin } from "../../../utilities/StyleHelper";
import { postOTPEntryCall } from "../helpers/SignInHelpers";
import { setUpRecaptcha } from "../../../context/AuthorizationContext";
import firebase from "firebase";

export interface SignInModal {
    showModal: boolean;
    showPhoneNumber: boolean;
    showOTP: boolean;

    setShowModal: any;
    setPhoneNumber: any;
    setOTPNumber: any;
    setShowPhoneNumber: any;
    setConfirmResult: any;
    setShowOTP: any;

    phoneNumber: string;
    otpNumber: string;

    login: any;
    confirmResult: any
}

export function SignInModal({ showModal, showPhoneNumber, showOTP,
    setShowModal, setPhoneNumber, setOTPNumber, setShowPhoneNumber, setConfirmResult, setShowOTP,
    phoneNumber, otpNumber,
    login, confirmResult
}: SignInModal) {

    let recapchaVerifier: firebase.auth.RecaptchaVerifier;

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

    return <Modal
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
                onClick={() => postOTPEntryCall(login, confirmResult, otpNumber, setShowModal)}
            >
                Enter OTP
            </MDBBtn>
        </div>
    </Modal>
}