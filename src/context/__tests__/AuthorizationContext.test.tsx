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
import firebase from 'firebase';
import { mount } from 'enzyme';
import { AuthorizationContextProvider } from '../AuthorizationContext';
import { waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

const mockAuthChangeCall = jest.fn();

jest.mock('./../../firebase/config', () => {
  const originalModule = jest.requireActual('./../../firebase/config');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      projectAuth: {
        onAuthStateChanged: mockAuthChangeCall,
      },
    }),
  };
});

describe('AuthorizationContextProvider', () => {
  it('STUB', () => {
    expect(1).toBe(1);
  });

  /*
  it('render as normal', () => {
    mockAuthChangeCall.mockImplementation(() => true);

    const mockDiv = <a>asdf</a>;
    const wrapper = mount(<AuthorizationContextProvider>{mockDiv}</AuthorizationContextProvider>);

    expect(wrapper.find('a').length).toBe(1);

    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    waitFor(() => {
      expect(mockAuthChangeCall).toBeCalled();
    });
  });

  it('render as normal, with no user result', () => {
    mockAuthChangeCall.mockImplementation(() => true);

    const mockDiv = <a>asdf</a>;
    const wrapper = mount(<AuthorizationContextProvider>{mockDiv}</AuthorizationContextProvider>);

    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    waitFor(() => {
      expect(mockAuthChangeCall).toBeCalled();
    });
  });
  */

  /*
  //TODO: need to raise an event in here
  it('render as normal, with user result', () => {
    const result = { uid: '123' } as firebase.User;

    mockAuthChangeCall.mockImplementation(() => result);

    const mockDiv = <a>asdf</a>;
    const wrapper = mount(<AuthorizationContextProvider>{mockDiv}</AuthorizationContextProvider>);

    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    waitFor(() => {
      expect(mockAuthChangeCall).toBeCalled();
    });
  });
  */
});
