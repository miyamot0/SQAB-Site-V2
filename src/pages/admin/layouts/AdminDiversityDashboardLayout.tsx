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

export interface AdminDiversityDashboardLayoutInterface {
  sysAdminFlag: boolean;
  diversityReviewFlag: boolean;
  userDocuments: IndividualUserRecordSaved[] | null;
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
export function AdminDiversityDashboardLayout({
  sysAdminFlag,
  diversityReviewFlag,
  userDocuments,
}: AdminDiversityDashboardLayoutInterface) {
  if (!userDocuments || (sysAdminFlag === false && diversityReviewFlag === false)) {
    return <></>;
  }

  // Gender
  const genderCategories = GenderOptions.map((gender) => gender.label);
  const genderDataDynamic: ChartDataFormat[] = [];
  genderCategories.forEach((gender) => {
    const value = {
      name: gender,
      y: userDocuments.map((doc) => doc.userGender).filter((val) => val === gender).length,
    } as ChartDataFormat;

    genderDataDynamic.push(value);
  });
  const genderData: DemographicsBarChartInterface = {
    name: 'Gender Demographics',
    data: genderDataDynamic,
  };

  // Education
  const educationCategories = EducationOptions.map((edu) => edu.label);
  const educationDataDynamic: ChartDataFormat[] = [];
  educationCategories.forEach((category) => {
    const value = {
      name: category,
      y: userDocuments.map((doc) => doc.userEducation).filter((val) => val === category).length,
    } as ChartDataFormat;

    educationDataDynamic.push(value);
  });
  const eduData: DemographicsBarChartInterface = {
    name: 'Education Demographics',
    data: educationDataDynamic,
  };

  // Age
  const ageCategories = AgeOptions.map((age) => age.label);
  const ageDataDynamic: ChartDataFormat[] = [];
  ageCategories.forEach((age) => {
    const value = {
      name: age,
      y: userDocuments.map((doc) => doc.userAge).filter((val) => val === age).length,
    } as ChartDataFormat;

    ageDataDynamic.push(value);
  });
  const ageData: DemographicsBarChartInterface = {
    name: 'Age Demographics',
    data: ageDataDynamic,
  };

  // Orientation
  const soCategories = SexualityOptions.map((sex) => sex.label);
  const soDataDynamic: ChartDataFormat[] = [];
  soCategories.forEach((sex) => {
    const value = {
      name: sex,
      y: userDocuments.map((doc) => doc.userOrientation).filter((val) => val === sex).length,
    } as ChartDataFormat;

    soDataDynamic.push(value);
  });
  const sexData: DemographicsBarChartInterface = {
    name: 'Age Demographics',
    data: soDataDynamic,
  };

  // Nationality
  const natlCategories = userDocuments
    .map((docs) => docs.userNationality)
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
    .filter((natl) => natl && natl.trim().length > 0);
  const natlDataDynamic: { country: string | undefined; counts: number }[] = [];
  natlCategories.forEach((natl) => {
    const value = {
      country: natl,
      counts: userDocuments.map((doc) => doc.userNationality).filter((val) => val === natl).length,
    };

    natlDataDynamic.push(value);
  });
  const columnsNationality: ColumnType[] = [
    { label: 'Country', field: 'country', sort: 'asc' },
    { label: 'Counts', field: 'counts', sort: 'asc' },
  ];
  const dataTableNationality = {
    name: 'Nationality Demographics',
    data: {
      columns: columnsNationality,
      rows: natlDataDynamic,
    },
  };

  // Race/Ethnicity
  const reCategories = userDocuments
    .map((docs) => docs.userRaceEthnicity)
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
    .filter((natl) => natl && natl.trim().length > 0);
  const reDataDynamic: { background: string | undefined; counts: number }[] = [];
  reCategories.forEach((re) => {
    const value = {
      background: re,
      counts: userDocuments.map((doc) => doc.userRaceEthnicity).filter((val) => val === re).length,
    };

    reDataDynamic.push(value);
  });
  const columnsRaceEthnicity: ColumnType[] = [
    { label: 'Racial/Ethnic Background', field: 'background', sort: 'asc' },
    { label: 'Counts', field: 'counts', sort: 'asc' },
  ];
  const dataTableRaceEthnicity = {
    name: 'Racial/Ethnic Backgrounds',
    data: {
      columns: columnsRaceEthnicity,
      rows: reDataDynamic,
    },
  };

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
          <DemographicsBarChart demographicData={genderData} />
        </MDBCol>

        <MDBCol sm="4">
          <DemographicsBarChart demographicData={eduData} />
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="4">
          <DemographicsBarChart demographicData={ageData} />
        </MDBCol>

        <MDBCol sm="4">
          <DemographicsBarChart demographicData={sexData} />
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="4">
          <DemographicsDataTable demographicData={dataTableNationality} />
        </MDBCol>

        <MDBCol sm="4">
          <DemographicsDataTable demographicData={dataTableRaceEthnicity} />
        </MDBCol>
      </MDBRow>
    </>
  );
}
