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
import { DemographicsDataTable, DemographicsDataTableInterface } from '../DemographicsDataTable';
import { MDBCard } from 'mdb-react-ui-kit';
import { ColumnType } from '../../types/TableTypes';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('DemographicsDataTable', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => { }; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render', () => {
    const demographicData = {
      name: '',
      data: {
        columns: [{}] as ColumnType[],
        rows: [{}],
      },
    } as DemographicsDataTableInterface;

    const wrapper = mount(<DemographicsDataTable demographicData={demographicData} />);

    expect(wrapper.find(MDBCard).length).toBe(1);
  });

  it('Should not render', () => {
    const demographicData = null as unknown as DemographicsDataTableInterface;

    const wrapper = mount(<DemographicsDataTable demographicData={demographicData} />);

    expect(wrapper.find(MDBCard).length).toBe(0);
  });
});
