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
import ReactModal from 'react-modal';
import SignIn from '../SignIn';
import { act, waitFor } from '@testing-library/react';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

let mockUserStatus: firebase.User | null;
let mockReadyStatus: boolean;
jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockUserStatus = {} as unknown as firebase.User;
  mockReadyStatus = false;
  return {
    useAuthorizationContext: () => ({
      user: mockUserStatus,
      authIsReady: mockReadyStatus,
    }),
  };
});

// TODO: GOOD login mock
jest.mock('../../../firebase/hooks/useFirebaseLogin', () => {
  return {
    useFirebaseLogin: () => ({
      login: jest.fn(() => true),
      loginPending: false,
      loginError: null,
    }),
  };
});

// TODO: GOOD firestore
jest.mock('../../../firebase/hooks/useFirestore', () => {
  return {
    useFirestore: () => ({
      dispatchIfNotCancelled: jest.fn(),
      updateDocument: jest.fn(),
      addDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistory,
  }),
  useRouteMatch: () => ({ url: `/signin` }),
}));

describe('SignIn', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render, not ready', async () => {
    await act(async () => {
      const wrapper = mount(<SignIn />);

      expect(wrapper.find(SignIn).length).toBe(1);

      expect(wrapper.find('.button-fit-card').at(0).text()).toBe('Authenticate via Text Message');
      expect(wrapper.find('.button-fit-card').at(1).text()).toBe('Authenticate via Text Message');

      //wrapper.find('.button-fit-card').at(1).simulate('click')

      expect(wrapper.find('.button-fit-card').at(2).text()).toBe('Authenticate via Google Account');
      expect(wrapper.find('.button-fit-card').at(3).text()).toBe('Authenticate via Google Account');

      //wrapper.find('.button-fit-card').at(3).simulate('click')

      expect(wrapper.find('.button-fit-card').at(4).text()).toBe(
        'Authenticate via Facebook Account',
      );
      expect(wrapper.find('.button-fit-card').at(5).text()).toBe(
        'Authenticate via Facebook Account',
      );

      //wrapper.find('.button-fit-card').at(5).simulate('click')
    });
  });

  it('Should render, ready', async () => {
    mockUserStatus = { uid: '123' } as firebase.User;
    mockReadyStatus = true;

    await act(async () => {
      const wrapper = mount(<SignIn />);

      await waitFor(() => {
        expect(mockHistory).toBeCalled();

        expect(wrapper.find('.button-fit-card').at(0).text()).toBe('Authenticate via Text Message');
        expect(wrapper.find('.button-fit-card').at(1).text()).toBe('Authenticate via Text Message');

        wrapper.find('.button-fit-card').at(1).simulate('click');

        expect(wrapper.find('.button-fit-card').at(2).text()).toBe(
          'Authenticate via Google Account',
        );
        expect(wrapper.find('.button-fit-card').at(3).text()).toBe(
          'Authenticate via Google Account',
        );

        wrapper.find('.button-fit-card').at(3).simulate('click');

        expect(wrapper.find('.button-fit-card').at(4).text()).toBe(
          'Authenticate via Facebook Account',
        );
        expect(wrapper.find('.button-fit-card').at(5).text()).toBe(
          'Authenticate via Facebook Account',
        );

        wrapper.find('.button-fit-card').at(5).simulate('click');
      });
    });
  });
});
