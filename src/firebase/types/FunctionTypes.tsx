/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ColumnType } from '../../pages/admin/types/TableTypes';
import { DemographicsBarChartInterface } from '../../pages/admin/views/DemographicsBarChart';
import { SingleOptionType } from '../../pages/tools/types/GeneralTypes';

export interface DiversityFunctionResponse {
  status: string;
  message: string;
  genderData: DemographicsBarChartInterface;
  eduData: DemographicsBarChartInterface;
  ageData: DemographicsBarChartInterface;
  sexData: DemographicsBarChartInterface;
  dataTableNationality: {
    name: string;
    data: {
      columns: ColumnType[];
      rows: {
        country: string | undefined;
        counts: number;
      }[];
    };
  };
  dataTableRaceEthnicity: {
    name: string;
    data: {
      columns: ColumnType[];
      rows: {
        country: string | undefined;
        counts: number;
      }[];
    };
  };
}

export interface RecruitmentFunctionResponse {
  status: string;
  message: string;
  arrayUsersNeedAds: SingleOptionType[];
}
