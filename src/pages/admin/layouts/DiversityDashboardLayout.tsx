/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { IndividualUserRecordSaved } from '../../../firebase/types/RecordTypes';
import { ColumnType } from '../types/TableTypes';
import { DemographicsBarChart, DemographicsBarChartInterface } from '../views/DemographicsBarChart';
import { DemographicsDataTable } from '../views/DemographicsDataTable';
import {
  AgeOptions,
  EducationOptions,
  GenderOptions,
  SexualityOptions,
} from '../../user/helpers/DemographicOptions';
import { DiversityFunctionResponse } from '../../../firebase/types/FunctionTypes';

export interface DiversityDashboardLayoutInterface {
  sysAdminFlag: boolean;
  diversityReviewFlag: boolean;
  currentDemographics: DiversityFunctionResponse | null | undefined;
}

export type ChartDataFormat = {
  name: string;
  y: number;
};

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function DiversityDashboardLayout({
  sysAdminFlag,
  diversityReviewFlag,
  currentDemographics,
}: DiversityDashboardLayoutInterface) {
  if (!currentDemographics || (sysAdminFlag === false && diversityReviewFlag === false)) {
    return <></>;
  }

  return (
    <>
      <MDBRow center>
        <MDBCol sm="8">
          <h4
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Demographic Information
          </h4>
        </MDBCol>
      </MDBRow>

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
  );
}
