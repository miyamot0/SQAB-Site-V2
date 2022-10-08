/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactModal from 'react-modal';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DiversityDashboardLayout } from '../DiversityDashboardLayout';
import { DiversityFunctionResponse } from '../../../../firebase/types/FunctionTypes';
import { BarChartEntry, DemographicsBarChartInterface } from '../../views/DemographicsBarChart';
import { act } from 'react-dom/test-utils';
import { DemographicPanel } from '../../views/DemographicPanel';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockDiversityResponse: DiversityFunctionResponse = {
  status: 'string',
  message: 'string',
  genderData: {
    name: 'string',
    data: [
      {
        name: 'string',
        y: 1,
      },
    ] as BarChartEntry[],
  } as DemographicsBarChartInterface,
  eduData: {
    name: 'string',
    data: [
      {
        name: 'string',
        y: 1,
      },
    ] as BarChartEntry[],
  } as DemographicsBarChartInterface,
  ageData: {
    name: 'string',
    data: [
      {
        name: 'string',
        y: 1,
      },
    ] as BarChartEntry[],
  } as DemographicsBarChartInterface,
  sexData: {
    name: 'string',
    data: [
      {
        name: 'string',
        y: 1,
      },
    ] as BarChartEntry[],
  } as DemographicsBarChartInterface,
  dataTableNationality: {
    name: 'string',
    data: {
      columns: [
        {
          label: 'string',
          field: 'string',
        },
      ],
      rows: [
        {
          country: 'asdf',
          counts: 1,
        },
      ],
    },
  },
  dataTableRaceEthnicity: {
    name: 'string',
    data: {
      columns: [
        {
          label: 'string',
          field: 'string',
        },
      ],
      rows: [
        {
          country: 'asdf',
          counts: 1,
        },
      ],
    },
  },
};

let mockUpdateStatusForRecruitment: jest.Mock<any, any>;

jest.mock('../../../../firebase/hooks/useFirebaseFunction', () => {
  mockUpdateStatusForRecruitment = jest.fn();

  return {
    updateStatusForRecruitment: jest.fn(),
    createBlankTemplateRecruitment: jest.fn(),
    updateStatusForPoster: jest.fn(),
    getAggregatedDiversityInformation: jest.fn(),
    getFilteredRecruitmentInformation: jest.fn(),
    useFirebaseFunction: () => ({
      updateStatusForRecruitment: jest.fn(),
      createBlankTemplateRecruitment: jest.fn(),
      updateStatusForPoster: jest.fn(),
      getAggregatedDiversityInformation: jest.fn(),
      getFilteredRecruitmentInformation: jest.fn(),
    }),
  };
});

jest.mock('../../helpers/AdministrationHelpers', () => {
  return {
    createBlankAdTemplate: jest.fn(),
    toggleRecruitmentStatus: jest.fn(),
    togglePosterStatus: jest.fn(),
    pullAggregatedDiversityInformation: jest.fn(),
  };
});

describe('DiversityDashboardLayout', () => {
  it('Should render, good data', () => {
    act(() => {
      const wrapper = mount(
        <DiversityDashboardLayout sysAdminFlag={true} diversityReviewFlag={true} />,
      );

      expect(wrapper.find(DemographicPanel).length).toBe(1);
    });
  });

  it('Should render, no sys privs', () => {
    act(() => {
      const wrapper = shallow(
        <DiversityDashboardLayout sysAdminFlag={false} diversityReviewFlag={true} />,
      );

      expect(wrapper.find(DemographicPanel).length).toBe(1);
    });
  });

  it('Should not render, no privs', () => {
    act(() => {
      const wrapper = shallow(
        <DiversityDashboardLayout sysAdminFlag={false} diversityReviewFlag={false} />,
      );
    });
  });
});
