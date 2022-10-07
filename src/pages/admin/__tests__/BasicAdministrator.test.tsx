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
import BasicAdministrator from '../BasicAdministrator';
import * as AuthHooks from '../../../context/hooks/useAuthorizationContext';
import * as FBHooks from '../../../firebase/hooks/useFirebaseCollection';
import * as FBFunctions from '../../../firebase/hooks/useFirebaseFunction';
import {
  DiversityFunctionResponse,
  RecruitmentFunctionResponse,
} from '../../../firebase/types/FunctionTypes';
import { BarChartEntry, DemographicsBarChartInterface } from '../views/DemographicsBarChart';
import { act } from 'react-dom/test-utils';
import { timestamp } from '../../../firebase/config';
import { waitFor } from '@testing-library/react';
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

describe('Basic Administrator', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => { }; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

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

      const wrapper = mount(<BasicAdministrator />);

      expect(wrapper.find('Demographic Information').length).toBe(0);
      expect(wrapper.find('Authorization for Recruitment').length).toBe(0);
      expect(wrapper.find('Authorization for Posters').length).toBe(0);
    });
  });

  it('Should render, specific to diversity', async () => {
    await act(async () => {
      authSpy.mockReturnValue({
        user: { uid: '123' } as firebase.User,
        authIsReady: true,
        studentRecruitFlag: false,
        systemAdministratorFlag: false,
        diversityReviewFlag: true,
        submissionReviewFlag: false,
        dispatch: dispatch,
      });

      const mockDiv = jest.fn();
      mockDiv.mockReturnValue(Promise.resolve({ data: mockDiversityResponse }));
      divSpy.mockImplementation(mockDiv);

      const mockStu = jest.fn();
      mockStu.mockReturnValue(Promise.resolve({ data: mockStudentFxResult }));
      stuSpy.mockImplementation(mockStu);

      const wrapper = mount(<BasicAdministrator />);

      await waitFor(() => {
        expect(wrapper.find('h4').text().includes('Demographic Information')).toBe(true);
        expect(wrapper.find('h4').text().includes('Authorization for Recruitment')).toBe(false);
        expect(wrapper.find('h4').text().includes('Authorization for Posters')).toBe(false);
      });
    });
  });

  it('Should render, specific to recruitment', async () => {
    await act(async () => {
      authSpy.mockReturnValue({
        user: { uid: '123' } as firebase.User,
        authIsReady: true,
        studentRecruitFlag: true,
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

      const wrapper = mount(<BasicAdministrator />);

      await waitFor(() => {
        expect(wrapper.find('h4').text().includes('Demographic Information')).toBe(false);
        expect(wrapper.find('h4').text().includes('Authorization for Recruitment')).toBe(true);
        expect(wrapper.find('h4').text().includes('Authorization for Posters')).toBe(false);
      });
    });
  });

  it('Should render, specific to posters', async () => {
    await act(async () => {
      authSpy.mockReturnValue({
        user: { uid: '123' } as firebase.User,
        authIsReady: true,
        studentRecruitFlag: false,
        systemAdministratorFlag: false,
        diversityReviewFlag: false,
        submissionReviewFlag: true,
        dispatch: dispatch,
      });

      const mockDiv = jest.fn();
      mockDiv.mockReturnValue(Promise.resolve({ data: mockDiversityResponse }));
      divSpy.mockImplementation(mockDiv);

      const mockStu = jest.fn();
      mockStu.mockReturnValue(Promise.resolve({ data: mockStudentFxResult }));
      stuSpy.mockImplementation(mockStu);

      const wrapper = mount(<BasicAdministrator />);

      await waitFor(() => {
        expect(wrapper.find('h4').text().includes('Demographic Information')).toBe(false);
        expect(wrapper.find('h4').text().includes('Authorization for Recruitment')).toBe(false);
        expect(wrapper.find('h4').text().includes('Authorization for Posters')).toBe(true);
      });
    });
  });
});
