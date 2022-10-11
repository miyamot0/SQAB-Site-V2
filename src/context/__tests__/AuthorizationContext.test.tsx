/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { AuthorizationContextProvider, setUpRecaptcha } from '../AuthorizationContext';
import { mockSignInWithPhoneNumber } from '../../../jestSetup';
import Home from '../../pages/home/Home';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('AuthorizationContextProvider', () => {
  it('Should render', () => {
    const wrapper = mount(
      <AuthorizationContextProvider>
        <Home />
      </AuthorizationContextProvider>,
    );

    expect(wrapper.find(AuthorizationContextProvider).length).toBe(1);
  });
});

describe('setUpRecaptcha', () => {
  beforeAll(() => {
    mockSignInWithPhoneNumber.mockClear();
  });

  afterAll(() => {
    mockSignInWithPhoneNumber.mockClear();
  });

  it('Should fire', async () => {
    const phoneNumber = '123';
    const recaptchaVerifier = {} as firebase.auth.RecaptchaVerifier;
    await setUpRecaptcha(phoneNumber, recaptchaVerifier);

    expect(mockSignInWithPhoneNumber).toBeCalled();
  });
});
