/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import AnalyticPmax from '../AnalyticPmax';
import { render, act } from '@testing-library/react';
import selectEvent from 'react-select-event';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('AnalyticPmax', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => { }; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render', async () => {
    await act(async () => {
      const { getByLabelText, getAllByText } = render(<AnalyticPmax />);

      await selectEvent.select(getByLabelText("Select Implementation of Framework:"), "2-Parameter ZBE (no K)");
      await selectEvent.select(getByLabelText("Select Implementation of Framework:"), "3-Parameter ZBE (with K)");
      await selectEvent.select(getByLabelText("Select Implementation of Framework:"), "Exponential Model");

      expect(getAllByText("Load Example Data").length).toBe(1);
      expect(getAllByText("Calculate").length).toBe(1);

      getAllByText("Load Example Data").at(0)?.click();

      getAllByText("Calculate").at(0)?.click();
    })
  });
});
