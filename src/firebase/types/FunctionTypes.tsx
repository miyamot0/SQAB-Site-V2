import { ColumnType } from '../../pages/admin/types/TableTypes';
import { DemographicsBarChartInterface } from '../../pages/admin/views/DemographicsBarChart';

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
