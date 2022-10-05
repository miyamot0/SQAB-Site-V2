/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactModal from 'react-modal';
import firebase from 'firebase';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DiversityDashboardLayout } from '../DiversityDashboardLayout';
import { DiversityFunctionResponse } from '../../../../firebase/types/FunctionTypes';
import { BarChartEntry, DemographicsBarChartInterface } from '../../views/DemographicsBarChart';
import * as FBFunctions from '../../../../firebase/hooks/useFirebaseFunction';
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

describe('DiversityDashboardLayout', () => {
  it('Should render, good data', () => {
    act(() => {
      const divSpy = jest.spyOn(FBFunctions, 'getAggregatedDiversityInformation');
      const sysAdminFlag = true;
      const diversityReviewFlag = true;

      const mockDiv = jest.fn();
      mockDiv.mockReturnValue(Promise.resolve({ data: mockDiversityResponse }));
      divSpy.mockImplementation(mockDiv);

      const wrapper = shallow(
        <DiversityDashboardLayout
          sysAdminFlag={sysAdminFlag}
          diversityReviewFlag={diversityReviewFlag}
        />,
      );

      expect(wrapper.find(DemographicPanel).length).toBe(1);
    });
  });

  it('Should not render, quirky data', () => {
    act(() => {
      const divSpy = jest.spyOn(FBFunctions, 'getAggregatedDiversityInformation');
      const sysAdminFlag = true;
      const diversityReviewFlag = true;

      const mockDiv = jest.fn();
      mockDiv.mockReturnValue(
        Promise.resolve({
          data: {
            ...mockDiversityResponse,
            genderData: null,
          },
        }),
      );
      divSpy.mockImplementation(mockDiv);

      const wrapper = shallow(
        <DiversityDashboardLayout
          sysAdminFlag={sysAdminFlag}
          diversityReviewFlag={diversityReviewFlag}
        />,
      );

      expect(wrapper.find(DemographicPanel).length).toBe(1);
    });
  });
});
