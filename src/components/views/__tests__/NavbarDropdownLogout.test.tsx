/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { NavbarDropdownLogout } from '../NavbarDropdownLogout';

Enzyme.configure({ adapter: new Adapter() });

describe('NavbarDropdownLogout', () => {
  it('should render and fire', () => {
    const logout = jest.fn();

    act(() => {
      const wrapper = shallow(<NavbarDropdownLogout logout={logout} />);

      //expect(wrapper.html().toString()).toStrictEqual({});

      //expect(wrapper.find('a').length).toBe(1);
      //expect(wrapper.find('li').length).toBe(1);
      //const a = wrapper.find('a').last().simulate('click');
    });
  });
});
