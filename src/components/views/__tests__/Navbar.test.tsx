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
import { act } from 'react-dom/test-utils';
import { Navbar } from '../Navbar';
import { AuthorizationContextProvider } from '../../../context/AuthorizationContext';

Enzyme.configure({ adapter: new Adapter() });

let mockUseAuthContext: jest.Mock<any, any>;
let mockUseLogout: jest.Mock<any, any>;

// TODO: rep GOOD auth mock
jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockUseAuthContext = jest.fn();
  return {
    useAuthorizationContext: mockUseAuthContext.mockImplementation(() => ({
      user: null,
      authIsReady: false,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    })),
  };
});

// TODO: rep GOOD logout mock
jest.mock('../../../firebase/hooks/useFirebaseLogout', () => {
  mockUseLogout = jest.fn();
  return {
    useFirebaseLogout: mockUseLogout.mockImplementation(() => ({
      logout: jest.fn(),
      logoutError: null,
      logoutPending: false,
    })),
  };
});

describe('Navbar', () => {
  it('On load, not ready', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: null as unknown as firebase.User,
      authIsReady: false,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    const toggleView = jest.fn();
    const showBasic = true;
    const openModal = jest.fn();
    const operModal2 = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Navbar
            toggleView={toggleView}
            showBasic={showBasic}
            openModal={openModal}
            openModal2={operModal2}
          />
        </AuthorizationContextProvider>,
      );

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');
      //TODO: issue overriding user
    });
  });

  it('On load, ready, user null', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: null as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    const toggleView = jest.fn();
    const showBasic = true;
    const openModal = jest.fn();
    const operModal2 = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Navbar
            toggleView={toggleView}
            showBasic={showBasic}
            openModal={openModal}
            openModal2={operModal2}
          />
        </AuthorizationContextProvider>,
      );

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');
      //TODO: issue overriding user
    });
  });

  it('On load, ready, user good, not pending', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    mockUseLogout.mockImplementation(() => ({
      logout: jest.fn(),
      logoutError: null,
      logoutPending: false,
    }));

    const toggleView = jest.fn();
    const showBasic = true;
    const openModal = jest.fn();
    const operModal2 = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Navbar
            toggleView={toggleView}
            showBasic={showBasic}
            openModal={openModal}
            openModal2={operModal2}
          />
        </AuthorizationContextProvider>,
      );

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');
      //TODO: issue overriding user
    });
  });

  it('On load, ready, user good, pending logout', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    mockUseLogout.mockImplementation(() => ({
      logout: jest.fn(),
      logoutError: null,
      logoutPending: true,
    }));

    const toggleView = jest.fn();
    const showBasic = true;
    const openModal = jest.fn();
    const operModal2 = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Navbar
            toggleView={toggleView}
            showBasic={showBasic}
            openModal={openModal}
            openModal2={operModal2}
          />
        </AuthorizationContextProvider>,
      );

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');
      //TODO: issue overriding user
    });
  });

  it('On load, ready, user good, not pending, admin', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: true,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    mockUseLogout.mockImplementation(() => ({
      logout: jest.fn(),
      logoutError: null,
      logoutPending: false,
    }));

    const toggleView = jest.fn();
    const showBasic = true;
    const openModal = jest.fn();
    const operModal2 = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Navbar
            toggleView={toggleView}
            showBasic={showBasic}
            openModal={openModal}
            openModal2={operModal2}
          />
        </AuthorizationContextProvider>,
      );

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');
      //TODO: issue overriding user

      expect(wrapper.find('a.dropdown-toggle').length).toBe(3);
      wrapper.find('a.dropdown-toggle').at(0).simulate('click');
      wrapper.find('a.dropdown-toggle').at(1).simulate('click');
      wrapper.find('a.dropdown-toggle').at(2).simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      expect(wrapper.find('a.dropdown-item').length).toBe(0);

      //expect(wrapper.find('[aria-expanded="false"]').at(0).text()).toStrictEqual({});
    });
  });
});
