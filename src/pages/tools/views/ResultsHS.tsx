/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { CardBodyTextStyle } from "../../../utilities/StyleHelper";
import { generateOutputScore, generateSlope, renderExponentialDemand, renderExponentiatedDemand, renderIHS3Demand } from "../helpers/DemandHelpers";
import { unIHS } from './../helpers/DemandHelpers';
import { round } from "../helpers/GeneralHelpers";

export interface ResultsHS {
    hotData2: string[][] | undefined,
    model: string
}

/** generateStringOutput
 * 
 * @param row 
 * @param index 
 * @returns 
 */
function generateStringOutput(model: string, row: string[], index: number): JSX.Element {
    if (row[0].trim().length === 0) {
        return <div key={index}></div>;
    }

    const rowInNumbers = row.map(Number);

    // Scale prices into log units
    const P1 = Math.log10(rowInNumbers[3]);
    const P2 = Math.log10(rowInNumbers[3] * 1.01);

    const modelOption = model.includes('Exponential') ? renderExponentialDemand : renderExponentiatedDemand;

    // Get consumption values (already in log units)
    let Q1 = modelOption(rowInNumbers[0], rowInNumbers[1], rowInNumbers[2], Math.pow(10, P1));
    let Q2 = modelOption(rowInNumbers[0], rowInNumbers[1], rowInNumbers[2], Math.pow(10, P2));

    if (model.includes('Exponential')) {
        Q1 = Math.pow(10, Q1);
        Q2 = Math.pow(10, Q2);
    }

    const QD = ((Q2 - Q1) / Q2) * 100;
    const PD = 1.01;

    const noteString = rowInNumbers[2] < (Math.E / Math.log(10)) ? 'Note: Solved via optimization.' : "Note: Solved via exact solution.";

    return (
        <div key={index}>
            <h5>{`Row #${index + 1}`}</h5>
            <p className="toolTextOutputStyle">
                Analytic{" "}<i>P<sub>MAX</sub></i>{' '} = {round(rowInNumbers[3], 4)}
                <br />
                ((&Delta;Q)/(&Delta;P %1 Increase Unit Price)) = {generateOutputScore(QD, PD)} ={' '}
                {generateSlope(QD, PD)}
                <br />
                {noteString}{' '}
            </p>
        </div>
    );
}

export function ResultsHS({ hotData2, model }: ResultsHS) {
    return <MDBCard className="outputPanel">
        <MDBCardBody>
            <MDBCardTitle>
                P<sub>MAX</sub> Output Logs
            </MDBCardTitle>
            <MDBCardText style={CardBodyTextStyle}></MDBCardText>
            {hotData2?.map((row, index) => generateStringOutput(model, row, index))}
        </MDBCardBody>
    </MDBCard>;
}