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
import { TutorialVideo } from '../TutorialVideo';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('TutorialVideo', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should draw when appropriate video info found', () => {
    const id = '1';
    const showDirectory = false;

    const wrapper = shallow(<TutorialVideo id={id} showDirectory={showDirectory} />);

    expect(wrapper.find('.blank-div-video').length).toBe(0);
  });

  it('Should fail when no video info found', () => {
    const id = 'a';
    const showDirectory = false;

    const wrapper = shallow(<TutorialVideo id={id} showDirectory={showDirectory} />);

    expect(wrapper.find('.blank-div-video').length).toBeGreaterThanOrEqual(1);
  });

  it('Should draw when appropriate video info found, omit prev at 0', () => {
    const id = '0';
    const showDirectory = false;

    const wrapper = shallow(<TutorialVideo id={id} showDirectory={showDirectory} />);

    expect(wrapper.find('.blank-div-video').length).toBe(0);
  });

  it('Should draw when appropriate video info found, omit prev at 77', () => {
    const id = '77';
    const showDirectory = false;

    const wrapper = shallow(<TutorialVideo id={id} showDirectory={showDirectory} />);

    expect(wrapper.find('.blank-div-video').length).toBe(0);
  });
});
