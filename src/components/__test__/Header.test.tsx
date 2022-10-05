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
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthorizationContext, AuthorizationContextProvider } from '../../context/AuthorizationContext';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

let mockUserStatus: jest.Mock<any, any>;
let mockReadyStatus: jest.Mock<any, any>;

jest.mock('../../context/hooks/useAuthorizationContext', () => {
  mockUserStatus = jest.fn();
  mockReadyStatus = jest.fn();

  return {
    ...jest.requireActual('../../context/hooks/useAuthorizationContext'),
    user: mockUserStatus.mockReturnValue(undefined),
    authIsReady: mockReadyStatus.mockReturnValue(false)
  }
})

// TODO: stopped her

describe('Navbar', () => {
  it('On load', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(false)

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Header />
        </AuthorizationContextProvider>
      );
    })
  });
  /*
  it('Check render', async () => {
    await act(async () => {
      const wrapper = mount(
        <AuthorizationContext.Provider
          value={{
            user: { uid: '1234', email: 'asdf@asdf.com' } as firebase.User,
            authIsReady: false,
            studentRecruitFlag: false,
            diversityReviewFlag: false,
            systemAdministratorFlag: false,
            submissionReviewFlag: false,
            dispatch: undefined,
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
          ,
        </AuthorizationContext.Provider>,
      );

      await waitFor(() => {
        expect(wrapper.find(Header).length).toBe(1);
      });
    });
  });

  /*

  it('Check render and open modal button', async () => {
    await act(async () => {
      const wrapper = mount(
        <AuthorizationContext.Provider
          value={{
            user: { uid: '1234', email: 'asdf@asdf.com' } as firebase.User,
            authIsReady: false,
            studentRecruitFlag: false,
            diversityReviewFlag: false,
            systemAdministratorFlag: false,
            submissionReviewFlag: false,
            dispatch: undefined,
          }}
        >
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </AuthorizationContext.Provider>,
      );
    });
  });
  */
});
