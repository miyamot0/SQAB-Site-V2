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
import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBNavbarItem,
  MDBNavbarNav,
} from 'mdb-react-ui-kit';

Enzyme.configure({ adapter: new Adapter() });

describe('NavbarDropdownLogout', () => {
  it('should render and fire', () => {
    const logout = jest.fn();

    act(() => {
      let wrapper = mount(
        <MDBCollapse navbar show={false}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBDropdown isOpen={true}>
                <MDBDropdownMenu>
                  <NavbarDropdownLogout logout={logout} />
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>,
      );

      wrapper.find('a.dropdown-item').last().simulate('click');

      wrapper = wrapper.update();
      wrapper.render();

      expect(logout).toBeCalled();
    });
  });
});
