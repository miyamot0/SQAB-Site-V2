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
import ReactModal from 'react-modal';
import DemandCurveAnalyzer from '../DemandCurveAnalyzer';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('DemandCurveAnalyzer', () => {
  it('Should render', () => {
    const wrapper = shallow(<DemandCurveAnalyzer />);

    expect(1).toBe(1);
  });
});
