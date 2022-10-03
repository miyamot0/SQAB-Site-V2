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
import { generateOutputScore, generateSlope, renderIHS2Demand } from "../helpers/DemandHelpers";
import { unIHS } from './../helpers/DemandHelpers';
import { round } from "../helpers/GeneralHelpers";

export interface ResultsZBE2 {
    hotData2: string[][] | undefined
}

/** generateStringOutput
 * 
 * @param row 
 * @param index 
 * @returns 
 */
function generateStringOutput(row: string[], index: number): JSX.Element {
    if (row[0].trim().length === 0) {
        return <div key={index}></div>;
    }

    const rowInNumbers = row.map(Number);

    // Get consumption values (already in log units)
    const Q1 = renderIHS2Demand(rowInNumbers[0], rowInNumbers[1], rowInNumbers[2]);
    const Q2 = renderIHS2Demand(rowInNumbers[0], rowInNumbers[1], rowInNumbers[2] * 1.01);

    // Calculate deltas
    const QD = ((unIHS(Q2) - unIHS(Q1)) / unIHS(Q2)) * 100;
    const PD = 1.01;

    const noteString = 'Note: Solved directly referencing work output.';

    return (
        <div key={index}>
            <h5>{`Row #${index + 1}`}</h5>
            <p className="toolTextOutputStyle">
                Fitted{" "}<i>P<sub>MAX</sub></i>{' '} = {round(rowInNumbers[2], 4)}
                <br />
                ((&Delta;Q)/(&Delta;P %1 Increase Unit Price)) = {generateOutputScore(QD, PD)} ={' '}
                {generateSlope(QD, PD)}
                <br />
                {noteString}{' '}
            </p>
        </div>
    );
}

export function ResultsZBE2({ hotData2 }: ResultsZBE2) {
    return <MDBCard className="outputPanel">
        <MDBCardBody>
            <MDBCardTitle>
                P<sub>MAX</sub> Output Logs
            </MDBCardTitle>
            <MDBCardText style={CardBodyTextStyle}></MDBCardText>
            {hotData2?.map((row, index) => generateStringOutput(row, index))}
        </MDBCardBody>
    </MDBCard>;
}