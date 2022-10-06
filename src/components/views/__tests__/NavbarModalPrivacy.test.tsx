/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from '@testing-library/react';
import { NavbarModalPrivacy } from './../NavbarModalPrivacy';

Enzyme.configure({ adapter: new Adapter() });

describe('NavbarModalPrivacy', () => {
  it('On load', async () => {
    const modalIsOpen = true;
    const setIsOpen = jest.fn();
    const closeModal = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      const wrapper = shallow(
        <NavbarModalPrivacy
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
        />,
      );

      wrapper.find('button').first().simulate('click');
    });
  });
});
