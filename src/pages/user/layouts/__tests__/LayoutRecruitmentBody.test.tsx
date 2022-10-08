/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { RecruitmentAd } from '../../../../firebase/types/RecordTypes';
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces';
import { LayoutRecruitmentBody } from '../LayoutRecruitmentBody';

import * as RecruitmentHelpers from '../../helpers/RecruitmentHelpers';
import { EditRecruitmentState } from '../../../recruitment/types/RecruitmentTypes';

//const spyProfileCallback = jest.spyOn(RecruitmentHelpers, 'handleEditRecruitmentSubmit');
//spyProfileCallback.mockResolvedValue(Promise.resolve());

// TODO good useFirestoreReducer
jest.mock('../../../../firebase/hooks/useFirestore', () => {
  return {
    useFirestore: () => ({
      dispatchIfNotCancelled: jest.fn(),
      updateDocument: jest.fn(),
      addDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/user/${mockId}` }),
}));

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';

jest.mock('../../../../firebase/hooks/useFirebaseFunction', () => {
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

jest.mock('../../../admin/helpers/AdministrationHelpers', () => {
  return {
    createBlankAdTemplate: jest.fn(),
    toggleRecruitmentStatus: jest.fn(),
    togglePosterStatus: jest.fn(),
    pullAggregatedDiversityInformation: jest.fn(),
  };
});

const mockRecruitmentAd = {
  userEmail: 'string',
  userInstitution: 'string',
  userName: 'string',
  userPhone: 'string',
  Bio: 'string',
  Contact: 'string',
  Cycle: 'string',
  Description: 'string',
  Institution: 'string',
  Link: 'string',
  LabLink: 'string',
  Mentor: 'string',
  Name: 'string',
  Position: 'string',
  Approved: false,
  id: mockId,
};

describe('LayoutRecruitmentBody', () => {
  it('Should render, but data is incomplete', async () => {
    const state = mockRecruitmentAd as EditRecruitmentState;

    const updateDocument = jest.fn();
    const response = {} as FirestoreState;
    const dispatch = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <LayoutRecruitmentBody
          state={{
            ...state,
            userName: '1',
          }}
          id={'123'}
          history={{ push: jest.fn }}
          updateDocument={updateDocument}
          response={response}
          dispatch={dispatch}
        />,
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Recruitment Details')).toBe(true);
      });
    });

    act(() => {
      wrapper.find('input').forEach((input) => {
        input.simulate('change', { target: { value: '1' } });
      });

      wrapper.find('textarea').forEach((input) => {
        input.simulate('change', { target: { value: '1' } });
      });

      wrapper.find('.button-fit-card').first().simulate('click');
    });
  });

  it('Should render, data is complete', async () => {
    const state = mockRecruitmentAd as EditRecruitmentState;

    const updateDocument = jest.fn();
    const response = {} as FirestoreState;
    const dispatch = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <LayoutRecruitmentBody
          state={state}
          id={'123'}
          history={{ push: jest.fn }}
          updateDocument={updateDocument}
          response={response}
          dispatch={dispatch}
        />,
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Recruitment Details')).toBe(true);
      });
    });

    act(() => {
      wrapper.find('.button-fit-card').first().simulate('click');
    });
  });
});
