/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import {
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { useFirebaseLogin } from '../../firebase/hooks/useFirebaseLogin';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { SignInButtons } from './views/SignInButtons';
import { SignInInstructions } from './views/SignInInstructions';
import { SignInModal } from './views/SignInModal';

import 'react-phone-number-input/style.css';

export default function SignIn(): JSX.Element {
  const { login } = useFirebaseLogin();
  const { user, authIsReady } = useAuthorizationContext();
  const history = useHistory();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otpNumber, setOTPNumber] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(true);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [confirmResult, setConfirmResult] = useState<firebase.auth.ConfirmationResult>();

  useEffect(() => {
    if (user && authIsReady === true) {
      console.log('in push')
      history.push(`/user/${user.uid}`);
    }
  }, [user, authIsReady])

  return (
    <>
      <SignInModal showModal={showModal} showPhoneNumber={showPhoneNumber} showOTP={showOTP}
        setShowModal={setShowModal} setPhoneNumber={setPhoneNumber} setOTPNumber={setOTPNumber}
        phoneNumber={phoneNumber} otpNumber={otpNumber} login={login} confirmResult={confirmResult}
        setShowPhoneNumber={setShowPhoneNumber} setConfirmResult={setConfirmResult} setShowOTP={setShowOTP} />

      <SignInInstructions />

      <MDBRow center>
        <MDBCol sm="6">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <SignInButtons user={user} authIsReady={authIsReady}
        login={login} setShowModal={setShowModal} />

    </>
  );
}
