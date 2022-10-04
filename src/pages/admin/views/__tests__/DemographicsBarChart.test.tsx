/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from "react-modal";
import { MDBCard } from "mdb-react-ui-kit";
import { BarChartEntry, DemographicsBarChart, DemographicsBarChartInterface } from "../DemographicsBarChart";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('BarChartEntry', () => {
    it('Should render', () => {
        const demographicData = {
            name: '',
            data: [{}] as BarChartEntry[]
        } as DemographicsBarChartInterface;

        const wrapper = mount(<DemographicsBarChart demographicData={demographicData} />)

        expect(wrapper.find(MDBCard).length).toBe(1)

    })

    it('Should not render', () => {
        const demographicData = null as unknown as DemographicsBarChartInterface;

        const wrapper = mount(<DemographicsBarChart demographicData={demographicData} />)

        expect(wrapper.find(MDBCard).length).toBe(0)

    })
});