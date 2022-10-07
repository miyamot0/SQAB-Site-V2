/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import firebase from "firebase";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { SignInStatus } from "./SignInStatus";
import { ProviderTypes } from "../../../firebase/types/AccountTypes";

export interface SignInButtons {
    user: firebase.User | null;
    authIsReady: boolean;
    login: any;
    setShowModal: any;
}

export function SignInButtons({ user, authIsReady, login, setShowModal }: SignInButtons) {
    const buttonStatus = user !== null && authIsReady === true;

    return <MDBRow center className="row-eq-height center">
        <MDBCol sm="4">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Current Status: <SignInStatus user={user} authIsReady={authIsReady} /></MDBCardTitle>
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
}