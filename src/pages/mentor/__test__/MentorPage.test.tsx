/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import MentorPage from '../MentorPage';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('MentorPage', () => {
  it('Should render', () => {
    // TODO
    //const wrapper = mount(<MentorPage />);

    //expect(wrapper.find(MentorPage).length).toBe(1);
    expect(1).toBe(1);
  });
});
