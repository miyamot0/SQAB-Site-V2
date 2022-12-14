/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavbarDropdownAdmin } from '../NavbarDropdownAdmin';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
    firestore: {
      Timestamp: jest.fn(),
    },
    auth: {
      GoogleAuthProvider: jest.fn(),
      FacebookAuthProvider: jest.fn(),
    },
    functions: jest.fn(),
  };
});

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

jest.mock('../../../firebase/config', () => {
  return {
    projectFirestore: jest.fn(),
    projectAuth: {
      onAuthStateChanged: () => jest.fn(),
      signOut: () => jest.fn(),
    },
    projectFunctions: jest.fn(),
    googleAuthProvider: jest.fn(),
    fbAuthProvider: jest.fn(),
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

describe('NavbarDropdownAdmin', () => {
  it('Should render, good user object, no priv', async () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const authIsReady = true;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = false;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    await act(async () => {
      let wrapper = mount(
        <NavbarDropdownAdmin
          user={user}
          authIsReady={authIsReady}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logoutPending={false}
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

      const as = wrapper.find('a').last().simulate('click');

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Log Out')).toBe(true);
      });
    });
  });

  it('Should render, good user object, has priv', async () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const authIsReady = true;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = true;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    await act(async () => {
      let wrapper = mount(
        <NavbarDropdownAdmin
          user={user}
          authIsReady={authIsReady}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logoutPending={false}
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

      const as = wrapper.find('a').last().simulate('click');

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Log Out')).toBe(true);
      });
    });
  });

  it('Should render, good user object, has priv, not ready', async () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const authIsReady = false;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = true;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    await act(async () => {
      let wrapper = mount(
        <NavbarDropdownAdmin
          user={user}
          authIsReady={authIsReady}
          studentRecruitFlag={studentRecruitFlag}
          diversityReviewFlag={diversityReviewFlag}
          systemAdministratorFlag={systemAdministratorFlag}
          logoutPending={false}
          logout={dispatch}
          submissionReviewFlag={submissionReviewFlag}
        />,
      );

      wrapper = wrapper.update();
      wrapper.render();

      //await waitFor(() => {
      //  expect(wrapper.html().toString().includes('Resources')).toBe(true);
      //});
    });
  });

  it('Should render, good user object, no priv, logout pending', () => {
    const user = { uid: '456' } as unknown as firebase.User;
    const authIsReady = true;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = false;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    const wrapper = shallow(
      <NavbarDropdownAdmin
        user={user}
        authIsReady={authIsReady}
        studentRecruitFlag={studentRecruitFlag}
        diversityReviewFlag={diversityReviewFlag}
        systemAdministratorFlag={systemAdministratorFlag}
        logoutPending={true}
        logout={dispatch}
        submissionReviewFlag={submissionReviewFlag}
      />,
    );

    //expect(wrapper.html().toString().includes('Logging Out')).toBe(true);
  });

  it('Should render, null user object, no priv', () => {
    const user = null as unknown as firebase.User;
    const authIsReady = true;
    const studentRecruitFlag = false;
    const systemAdministratorFlag = false;
    const diversityReviewFlag = false;
    const submissionReviewFlag = false;
    const dispatch = jest.fn();

    const wrapper = shallow(
      <NavbarDropdownAdmin
        user={user}
        authIsReady={authIsReady}
        studentRecruitFlag={studentRecruitFlag}
        diversityReviewFlag={diversityReviewFlag}
        systemAdministratorFlag={systemAdministratorFlag}
        logoutPending={false}
        logout={dispatch}
        submissionReviewFlag={submissionReviewFlag}
      />,
    );
  });
});
