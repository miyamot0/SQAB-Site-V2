/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavbarDropdownFragmentOpen } from '../NavbarDropdownFragments';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

// TODO: rep GOOD logout mock
jest.mock('../../../firebase/hooks/useFirebaseLogout', () => {
  return {
    useFirebaseLogout: {
      logout: jest.fn(),
      logoutError: null,
      logoutPending: false,
    },
  };
});

let mockUpdateStatusForRecruitment: jest.Mock<any, any>;
jest.mock('../../../firebase/hooks/useFirebaseFunction', () => {
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

jest.mock('../../../pages/admin/helpers/AdministrationHelpers', () => {
  return {
    createBlankAdTemplate: jest.fn(),
    toggleRecruitmentStatus: jest.fn(),
    togglePosterStatus: jest.fn(),
    pullAggregatedDiversityInformation: jest.fn(),
  };
});

describe('NavbarDropdownFragments', () => {
  it('Should render, auth not ready, just dropdown', async () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = false;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    await act(async () => {
      let wrapper = mount(
        <NavbarDropdownFragmentOpen
          user={user}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logout={dispatch}
          submissionReviewFlag={submissionReviewFlag}
        />,
      );

      wrapper.find('a').first().simulate('click');
      wrapper = wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Resources')).toBe(true);
      });
    });
  });

  it('Should render, auth, no admin', async () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = false;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    await act(async () => {
      let wrapper = mount(
        <NavbarDropdownFragmentOpen
          user={user}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logout={dispatch}
          submissionReviewFlag={submissionReviewFlag}
        />,
      );

      wrapper.find('a').first().simulate('click');
      wrapper = wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Log Out')).toBe(true);
      });
    });
  });

  it('Should render, auth, has admin', async () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = true;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    await act(async () => {
      let wrapper = mount(
        <NavbarDropdownFragmentOpen
          user={user}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logout={dispatch}
          submissionReviewFlag={submissionReviewFlag}
        />,
      );

      wrapper.find('a').first().simulate('click');
      wrapper = wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Log Out')).toBe(true);
      });
    });
  });
});
