/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import { DiversityFunctionResponse } from "../../../firebase/types/FunctionTypes";
import { DemographicsBarChart } from "./DemographicsBarChart";
import { DemographicsDataTable } from "./DemographicsDataTable";

export interface DemographicPanel {
    currentDemographics: DiversityFunctionResponse | null | undefined
}

export type ChartDataFormat = {
    name: string;
    y: number;
};

export function DemographicPanel({ currentDemographics }: DemographicPanel) {
    if (!currentDemographics) {
        return <></>
    }

    return <>
        <MDBRow className="d-flex justify-content-center">
            <MDBCol sm="4">
                <DemographicsBarChart demographicData={currentDemographics.genderData} />
            </MDBCol>

            <MDBCol sm="4">
                <DemographicsBarChart demographicData={currentDemographics.eduData} />
            </MDBCol>
        </MDBRow>

        <MDBRow center>
            <MDBCol sm="8">
                <hr className="additional-margin" />
            </MDBCol>
        </MDBRow>

        <MDBRow className="d-flex justify-content-center">
            <MDBCol sm="4">
                <DemographicsBarChart demographicData={currentDemographics.ageData} />
            </MDBCol>

            <MDBCol sm="4">
                <DemographicsBarChart demographicData={currentDemographics.sexData} />
            </MDBCol>
        </MDBRow>

        <MDBRow center>
            <MDBCol sm="8">
                <hr className="additional-margin" />
            </MDBCol>
        </MDBRow>

        <MDBRow className="d-flex justify-content-center">
            <MDBCol sm="4">
                <DemographicsDataTable demographicData={currentDemographics.dataTableNationality} />
            </MDBCol>

            <MDBCol sm="4">
                <DemographicsDataTable demographicData={currentDemographics.dataTableRaceEthnicity} />
            </MDBCol>
        </MDBRow>
    </>
}