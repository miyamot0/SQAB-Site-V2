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
import { AuthorizationContextProvider } from '../AuthorizationContext';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SignIn from '../../pages/signin/SignIn';
import { MemoryRouter } from 'react-router';
import * as FirebaseRef from '../../firebase/config';

Enzyme.configure({ adapter: new Adapter() });

describe('AuthorizationContextProvider', () => {
  const mockAuthChangeCall = jest.fn();
  const spyProjectAuth = jest.spyOn(FirebaseRef.projectAuth, 'onAuthStateChanged');

  beforeAll(() => {
    spyProjectAuth.mockImplementation(mockAuthChangeCall);
  });

  beforeEach(() => {
    mockAuthChangeCall.mockClear();
  });

  it('STUB', () => {
    expect(1).toBe(1)
  })

  /*
  it('render as normal', async () => {
    await act(async () => {
      mockAuthChangeCall.mockImplementation(() => true);

      const wrapper = mount(
        <AuthorizationContextProvider>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </AuthorizationContextProvider>,
      );

      await waitFor(() => {
        expect(wrapper.find(SignIn).length).toBe(1);
      });
    });
  });
  */

  /*
  it('render as normal, with no user result', async () => {
    await act(async () => {
      mockAuthChangeCall.mockImplementation(() => true);

      const wrapper = mount(
        <AuthorizationContextProvider>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </AuthorizationContextProvider>,
      );

      await waitFor(() => {
        expect(mockAuthChangeCall).toBeCalled();
      });
    });
  });
  */

  /*
  //TODO: need to raise an event in here
  it('render as normal, with user result', async () => {
    await act(async () => {
      const result = { uid: '123' } as firebase.User;

      mockAuthChangeCall.mockImplementation(() => result);

      const mockDiv = <a>asdf</a>;
      const wrapper = mount(<AuthorizationContextProvider>{mockDiv}</AuthorizationContextProvider>);

      jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

      await waitFor(() => {
        expect(mockAuthChangeCall).toBeCalled();
      });
    });
  });
    */
});
