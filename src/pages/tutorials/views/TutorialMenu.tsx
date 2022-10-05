/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import tutorialJson from './../../../assets/json/tutorials.json';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";

export interface TutorialMenu {
    showDirectory: boolean
}

export function TutorialMenu({ showDirectory }: TutorialMenu) {
    if (showDirectory === false) {
        return <></>
    } else {
        return <MDBRow center className="row-eq-height">
            <MDBCol sm="8">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Available Tutorials</MDBCardTitle>
                        <ul className="tutorials-ul">
                            {tutorialJson.Tutorials.map((tut) => {
                                return (
                                    <li key={`index-${tut.Index}`}>
                                        <a href={`/tutorials/${tut.Index}`}>
                                            <span>{tut.Title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>;
    }
}