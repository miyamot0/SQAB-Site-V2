/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import firebase from 'firebase';
import React from 'react';
import ReactModal from 'react-modal';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as AuthHooks from '../../../context/hooks/useAuthorizationContext';
import * as FBFunctions from '../../../firebase/hooks/useFirebaseFunction';
import {
  DiversityFunctionResponse,
  RecruitmentFunctionResponse,
} from '../../../firebase/types/FunctionTypes';
import { BarChartEntry, DemographicsBarChartInterface } from '../views/DemographicsBarChart';
import { act } from 'react-dom/test-utils';
import { timestamp } from '../../../firebase/config';
import { waitFor } from '@testing-library/react';
import SystemAdministration from '../SystemAdministration';
import { projectFunctions } from '../../../firebase/config';

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

const mockStudentFxResult: RecruitmentFunctionResponse = {
  status: 'string',
  message: 'string',
  arrayUsersNeedAds: [{ value: '', label: '' }],
};

const mockDate = timestamp.fromDate(new Date());

/*
jest.mock("../../../firebase/hooks/useFirebaseCollection", () => ({
    useFirebaseCollectionTyped: jest.fn()
        .mockReturnValueOnce({
            documents: [{
                Bio: '',
                Contact: '',
                Cycle: '',
                Mentor: '',
                Position: '',
                Name: '',
                Description: 'string',
                Institution: 'string',
                Link: 'string',
                LabLink: 'string',
                Approved: false,
                id: 'string',
            }],
        })
        .mockReturnValueOnce({
            documents: [{
                name: 'string',
                title: 'string',
                email: 'string',
                abstract: 'string',
                list: 'string',
                time: mockDate,
                presenter: true,
                reviewed: true,
                id: ''
            }],
        }),

}));
*/

const jestTotalFunctions = jest.fn().mockResolvedValue(true);
const spyTotalFunctions = jest.spyOn(projectFunctions, 'httpsCallable');
spyTotalFunctions.mockImplementation(jestTotalFunctions);

describe('System Administrator', () => {
  const dispatch = jest.fn();
  const authSpy = jest.spyOn(AuthHooks, 'useAuthorizationContext');
  const divSpy = jest.spyOn(FBFunctions, 'getAggregatedDiversityInformation');
  const stuSpy = jest.spyOn(FBFunctions, 'getFilteredRecruitmentInformation');
  //const collSpy = jest.spyOn(FBHooks, 'useFirebaseCollectionTyped')

  it('Should render, but nothing in no perms', () => {
    act(() => {
      authSpy.mockReturnValue({
        user: { uid: '123' } as firebase.User,
        authIsReady: true,
        studentRecruitFlag: false,
        systemAdministratorFlag: false,
        diversityReviewFlag: false,
        submissionReviewFlag: false,
        dispatch: dispatch,
      });

      const mockDiv = jest.fn();
      mockDiv.mockReturnValue(Promise.resolve({ data: mockDiversityResponse }));
      divSpy.mockImplementation(mockDiv);

      const mockStu = jest.fn();
      mockStu.mockReturnValue(Promise.resolve({ data: mockStudentFxResult }));
      stuSpy.mockImplementation(mockStu);

      const wrapper = mount(<SystemAdministration />);

      expect(wrapper.find('h4').length).toBe(0);
    });
  });

  it('Should render, all permis', async () => {
    await act(async () => {
      authSpy.mockReturnValue({
        user: { uid: '123' } as firebase.User,
        authIsReady: true,
        studentRecruitFlag: false,
        systemAdministratorFlag: true,
        diversityReviewFlag: false,
        submissionReviewFlag: false,
        dispatch: dispatch,
      });

      const mockDiv = jest.fn();
      mockDiv.mockReturnValue(Promise.resolve({ data: mockDiversityResponse }));
      divSpy.mockImplementation(mockDiv);

      const mockStu = jest.fn();
      mockStu.mockReturnValue(Promise.resolve({ data: mockStudentFxResult }));
      stuSpy.mockImplementation(mockStu);

      const wrapper = mount(<SystemAdministration />);

      await waitFor(() => {
        expect(wrapper.find('h4').at(0).text()).toBe('Email and Correspondence');
        expect(wrapper.find('h4').at(1).text()).toBe('Demographic Information');
        expect(wrapper.find('h4').at(2).text()).toBe('Authorization for Recruitment');
        expect(wrapper.find('h4').at(3).text()).toBe('Authorization for Posters');
      });
    });
  });
});
