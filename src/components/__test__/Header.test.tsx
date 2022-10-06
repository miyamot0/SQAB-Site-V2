/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { render, waitFor, waitForOptions } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthorizationContext, AuthorizationContextProvider } from '../../context/AuthorizationContext';
import { WaitOptions } from '@testing-library/react-hooks';

Enzyme.configure({ adapter: new Adapter() });

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

// TODO: stopped here
ReactModal.setAppElement(document.createElement('div'));
describe('Navbar', () => {

  it('On load', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    jest
      .spyOn(Modal, "setAppElement")
      .mockImplementation(param => console.log(`setAppElement:'${param}'`));

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <Header />
        </AuthorizationContextProvider>
      );

      wrapper = wrapper.update()
      wrapper.render()

      wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

      wrapper = wrapper.update()
      wrapper.render()

      wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

      wrapper = wrapper.update()
      wrapper.render()

      wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');

      // TODO: portal quirks
    })
  });
});
