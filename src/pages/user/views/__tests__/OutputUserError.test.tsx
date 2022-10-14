/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { OutputUserError } from '../UserOutputError';

Enzyme.configure({ adapter: new Adapter() });

describe('OutputUserError', () => {
  it('Should be silent if no error', async () => {
    const error = undefined;

    const wrapper = shallow(<OutputUserError documentError={error} />);

    expect(wrapper.find('.error').length).toBe(0);
  });

  it('Should output upon error', async () => {
    const error = 'Error';

    const wrapper = shallow(<OutputUserError documentError={error} />);

    expect(wrapper.find('.error').length).toBe(1);
  });
});
