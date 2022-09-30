/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { IndividualUserRecord } from '../../../firebase/types/RecordTypes';
import { ColumnType } from '../types/TableTypes';
import { DemographicsBarChart, DemographicsBarChartInterface } from '../views/DemographicsBarChart';
import { DemographicsDataTable } from '../views/DemographicsDataTable';

export interface AdminDiversityDashboardLayoutInterface {
  sysAdminFlag: boolean;
  userDocuments: IndividualUserRecord[] | null;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function AdminDiversityDashboardLayout({
  sysAdminFlag,
  userDocuments,
}: AdminDiversityDashboardLayoutInterface) {
  if (!userDocuments || sysAdminFlag === false) {
    return <></>;
  }

  const columnsNationality: ColumnType[] = [
    { label: 'Country', field: 'country', sort: 'asc' },
    { label: 'Counts', field: 'counts', sort: 'asc' },
  ];

  const rowsNationality = [{
    country: 'USA',
    counts: 1
  }, {
    country: 'UK',
    counts: 1
  }]

  const demoNationality = {
    name: "Nationality Demographics",
    data: {
      columns: columnsNationality,
      rows: rowsNationality
    }
  }

  const columnsRaceEthnicity: ColumnType[] = [
    { label: 'Racial/Ethnic Background', field: 'background', sort: 'asc' },
    { label: 'Counts', field: 'counts', sort: 'asc' },
  ];

  const rowsRaceEthnicity = [{
    background: 'African American/Black',
    counts: 1
  }, {
    background: 'Asian',
    counts: 1
  }, {
    background: 'Caucasian/White',
    counts: 1
  }, {
    background: 'Hispanic/Latino/a/x',
    counts: 1
  }, {
    background: 'Middle Eastern/North African',
    counts: 1
  }, {
    background: 'Native American/American Indian/Alaska Native',
    counts: 1
  }, {
    background: 'Native Hawaiian or Pacific Islander',
    counts: 1
  }, {
    background: 'Other race or ethnicity',
    counts: 1
  }, {
    background: 'Prefer not to answer',
    counts: 1
  }
  ]

  const demoRaceEthnicity = {
    name: "Racial/Ethnic Backgrounds",
    data: {
      columns: columnsRaceEthnicity,
      rows: rowsRaceEthnicity
    }
  }

  const genderData: DemographicsBarChartInterface = {
    name: "Gender Demographics",
    data: [
      {
        name: "Woman",
        y: 1,
      },
      {
        name: "Man",
        y: 1,
      },
      {
        name: "Non-binary",
        y: 1,
      },
      {
        name: "Other gender",
        y: 1,
      },
      {
        name: "Prefer not to answer",
        y: 1,
      }
    ]
  }

  const eduData: DemographicsBarChartInterface = {
    name: "Education Demographics",
    data: [
      {
        name: "Some High School",
        y: 1,
      },
      {
        name: "High School",
        y: 1,
      },
      {
        name: "Trade School",
        y: 1,
      },
      {
        name: "Associates Degree",
        y: 1,
      },
      {
        name: "Bachelors Degree",
        y: 1,
      },
      {
        name: "Masters Degree",
        y: 1,
      },
      {
        name: "Doctoral Degree",
        y: 1,
      },
      {
        name: "Prefer not to answer",
        y: 1,
      }
    ]
  }

  const ageData: DemographicsBarChartInterface = {
    name: "Age Demographics",
    data: [
      {
        name: "<18 years",
        y: 1,
      },
      {
        name: "18-20",
        y: 1,
      },
      {
        name: "21-29",
        y: 1,
      },
      {
        name: "30-39",
        y: 1,
      },
      {
        name: "40-49'",
        y: 1,
      },
      {
        name: "50-59",
        y: 1,
      },
      {
        name: "60-69",
        y: 1,
      },
      {
        name: "70 or older",
        y: 1,
      },
      {
        name: "Prefer not to answer",
        y: 1,
      }
    ]
  }

  const orientationData: DemographicsBarChartInterface = {
    name: "Sexual Orientation",
    data: [
      {
        name: "Heterosexual or Straight",
        y: 1,
      },
      {
        name: "Gay or Lesbian",
        y: 1,
      },
      {
        name: "Bisexual",
        y: 1,
      },
      {
        name: "Other orientation",
        y: 1,
      },
      {
        name: "Prefer not to answer",
        y: 1,
      }
    ]
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
          <DemographicsBarChart demographicData={orientationData} />
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="4">
          <DemographicsDataTable demographicData={demoNationality} />
        </MDBCol>

        <MDBCol sm="4">
          <DemographicsDataTable demographicData={demoRaceEthnicity} />
        </MDBCol>
      </MDBRow>
    </>
  );
}
