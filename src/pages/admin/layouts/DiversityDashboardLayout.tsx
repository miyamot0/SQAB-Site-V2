/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { DiversityFunctionResponse } from '../../../firebase/types/FunctionTypes';
import { getAggregatedDiversityInformation } from '../../../firebase/hooks/useFirebaseFunction';
import { DemographicPanel } from '../views/DemographicPanel';

export interface DiversityDashboardLayout {
  sysAdminFlag: boolean;
  diversityReviewFlag: boolean;
}

/** AdministrationUserSummary
 *
 * @param param0
 * @returns
 */
export function DiversityDashboardLayout({
  sysAdminFlag,
  diversityReviewFlag,
}: DiversityDashboardLayout) {

  const [currentDemographics, setCurrentDemographics] = useState<DiversityFunctionResponse | null | undefined>(null);

  if (sysAdminFlag === false && diversityReviewFlag === false) {
    return <></>;
  }

  useEffect(() => {
    getAggregatedDiversityInformation().then((value) => {
      if (value && value.data) {
        const cast = value.data as DiversityFunctionResponse;

        if (cast && cast.genderData) {
          setCurrentDemographics(cast);
        } else {
          return;
        }
      } else {
        return;
      }
    });
  }, []);

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

      <DemographicPanel currentDemographics={currentDemographics} />
    </>
  );
}
