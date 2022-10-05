/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import Enzyme, { mount } from 'enzyme';
import { ResultsHS, ResultsZBE2, ResultsZBE3 } from "../DemandResults"

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('ResultsHS', () => {
    it('Should render with flat numbers, HS', () => {
        const model = "Exponential";
        const hotData = [
            ["1", "1", "1", "1"]
        ]

        const wrapper = mount(<ResultsHS hotData2={hotData} model={model} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(true);
    })

    it('Should render with blank numbers, HS', () => {
        const model = "Exponential";
        const hotData = [
            ["", "", "", ""]
        ]

        const wrapper = mount(<ResultsHS hotData2={hotData} model={model} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(false);
    })

    it('Should render with flat numbers, Koff', () => {
        const model = "Exponentiated";
        const hotData = [
            ["1", "1", "3", "1"]
        ]

        const wrapper = mount(<ResultsHS hotData2={hotData} model={model} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(true);
    })
})

describe('ResultsZBE2', () => {
    it('Should render with flat numbers', () => {
        const hotData = [
            ["1", "1", "1"]
        ]

        const wrapper = mount(<ResultsZBE2 hotData2={hotData} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(true);
    })

    it('Should render with blank numbers', () => {
        const hotData = [
            ["", "", ""]
        ]

        const wrapper = mount(<ResultsZBE2 hotData2={hotData} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(false);
    })
})

describe('ResultsZBE3', () => {
    it('Should render with flat numbers', () => {
        const hotData = [
            ["1", "1", "1", "1"]
        ]

        const wrapper = mount(<ResultsZBE3 hotData2={hotData} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(true);
    })

    it('Should render with blank numbers', () => {
        const hotData = [
            ["", "", "", ""]
        ]

        const wrapper = mount(<ResultsZBE3 hotData2={hotData} />)

        expect(wrapper.html().toString().includes("Increase Unit Price")).toBe(false);
    })
})