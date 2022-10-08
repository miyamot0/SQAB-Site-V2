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
import DemandCurveAnalyzer from '../DemandCurveAnalyzer';
import { act, render } from '@testing-library/react';
import selectEvent from 'react-select-event';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('DemandCurveAnalyzer', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  /*
  it('Should render, [0]', async () => {
    await act(async () => {
      const { getByLabelText, getAllByText } = render(<DemandCurveAnalyzer />);

      expect(getAllByText('Calculate').length).toBe(1);
      expect(getAllByText('Load Example Data').length).toBe(1);

      getAllByText('Load Example Data').at(0)?.click();

      await selectEvent.select(getByLabelText('Modeling Option:'), 'Zero-bounded Model (with K)');
      getAllByText('Calculate').at(0)?.click();

      await selectEvent.select(getByLabelText('Modeling Option:'), 'Zero-bounded Model (no K)');
      getAllByText('Calculate').at(0)?.click();

      await selectEvent.select(getByLabelText('Modeling Option:'), 'Exponentiated Model');
      getAllByText('Calculate').at(0)?.click();

      await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Fit as Parameter');
      await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Log Range');
    });
  });
  */

  it('Should render, [0]', async () => {
    await act(async () => {
      const { getByLabelText, getAllByText } = render(<DemandCurveAnalyzer />);

      expect(getAllByText('Calculate').length).toBe(1);
      expect(getAllByText('Load Example Data').length).toBe(1);

      getAllByText('Load Example Data').at(0)?.click();

      await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Fit as Parameter');
      //await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Log Range');

      getAllByText('Calculate').at(0)?.click();
    });
  });

  it('Should render, [1]', async () => {
    await act(async () => {
      const { getByLabelText, getAllByText } = render(<DemandCurveAnalyzer />);

      expect(getAllByText('Calculate').length).toBe(1);
      expect(getAllByText('Load Example Data').length).toBe(1);

      getAllByText('Load Example Data').at(0)?.click();

      await selectEvent.select(getByLabelText('Modeling Option:'), 'Zero-bounded Model (with K)');
      getAllByText('Calculate').at(0)?.click();

      await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Fit as Parameter');
      //await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Log Range');

      getAllByText('Calculate').at(0)?.click();
    });
  });

  it('Should render, [2]', async () => {
    await act(async () => {
      const { getByLabelText, getAllByText } = render(<DemandCurveAnalyzer />);

      expect(getAllByText('Calculate').length).toBe(1);
      expect(getAllByText('Load Example Data').length).toBe(1);

      getAllByText('Load Example Data').at(0)?.click();

      await selectEvent.select(getByLabelText('Modeling Option:'), 'Zero-bounded Model (no K)');
      getAllByText('Calculate').at(0)?.click();

      //await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Fit as Parameter');
      //await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Log Range');

      getAllByText('Calculate').at(0)?.click();
    });
  });

  it('Should render, [3]', async () => {
    await act(async () => {
      const { getByLabelText, getAllByText } = render(<DemandCurveAnalyzer />);

      expect(getAllByText('Calculate').length).toBe(1);
      expect(getAllByText('Load Example Data').length).toBe(1);

      getAllByText('Load Example Data').at(0)?.click();

      await selectEvent.select(getByLabelText('Modeling Option:'), 'Exponentiated Model');
      getAllByText('Calculate').at(0)?.click();

      await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Fit as Parameter');
      await selectEvent.select(getByLabelText('Scaling parameter (K) Value:'), 'Log Range');

      getAllByText('Calculate').at(0)?.click();
    });
  });
});
