/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";

import { CardBodyTextStyle } from '../../../utilities/StyleHelper';

export function PmaxHeading() {
    return <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>
                        Analytical P<sub>MAX</sub> Calculator
                    </MDBCardTitle>
                    <MDBCardText style={CardBodyTextStyle} className="toolsDescription">
                        The Analytical P<sub>MAX</sub> Calculator is a web-based tool for determining the
                        point of unit elasticity, or more literally, peak work. This calculator streamlines
                        the determination of an exact (Analytic) unit elasticity (i.e., slope = -1) using a
                        simple, copy-paste interface. This is a more accurate method of calculating P
                        <sub>MAX</sub>, one free from the error of approximations. Both the Approximate and
                        Exact (Analytic) P<sub>MAX</sub> measures are provided here, though the approximated
                        value is presented here purely for historical purposes.
                        <br />
                        <br />
                        <b>Based on the following works:</b>
                        <br />
                        Gilroy, S.P., Kaplan, B.A., Reed, D.D., Hantula, D.A., &#38; Hursh, S. R. (2019). An
                        Exact Solution for Unit Elasticity in the Exponential Model of Demand.{' '}
                        <i>Journal of Experimental and Clinical Psychopharmacology, 27(6)</i>, 588-597. doi:{' '}
                        <a href="https://psycnet.apa.org/doi/10.1037/pha0000268">10.1037/pha0000268</a>.
                        <br />
                        <br />
                        Gilroy, S. P., Kaplan, B. A., &#38; Reed, D. D. (2020). Interpretation (s) of
                        elasticity in operant demand.{' '}
                        <i>Journal of the Experimental Analysis of Behavior, 114(1)</i>, 106-115. doi:{' '}
                        <a href="https://doi.org/10.1002/jeab.610">10.1002/jeab.610</a>.
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>
}