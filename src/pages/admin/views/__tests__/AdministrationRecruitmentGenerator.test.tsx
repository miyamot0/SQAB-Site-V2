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
import selectEvent from "react-select-event";
import { SingleOptionType } from "../../../tools/types/GeneralTypes"
import { AdministrationRecruitmentGenerator } from "../AdministrationRecruitmentGenerator"
import * as Helpers from '../../helpers/AdministrationHelpers';
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const spyRecruitment = jest.spyOn(Helpers, 'createBlankAdTemplate');
spyRecruitment.mockImplementation();

describe('AdministrationRecruitmentGenerator', () => {
    it('Should render', () => {
        const dispatch = jest.fn();
        const userAddArray = [{ value: '', label: '' } as SingleOptionType]
        const selectedAdUser = userAddArray[0]
        const wrapper = mount(<AdministrationRecruitmentGenerator selectedAdUser={selectedAdUser}
            userAdArray={userAddArray}
            setSelectedAdUser={dispatch} />)

        expect(wrapper.find('a.button-fit-card').length).toBe(1)

        wrapper.find('a.button-fit-card').simulate('click')
    })

    it('Should render, despite bad array', () => {
        const dispatch = jest.fn();
        const userAddArray = null as unknown as SingleOptionType[];
        const selectedAdUser = null as unknown as SingleOptionType;
        const wrapper = mount(<AdministrationRecruitmentGenerator selectedAdUser={selectedAdUser}
            userAdArray={userAddArray}
            setSelectedAdUser={dispatch} />)

        expect(wrapper.find('a.button-fit-card').length).toBe(1)

        wrapper.find('a.button-fit-card').simulate('click')
    })

    it('Should respond to change', async () => {
        await act(async () => {
            const dispatch = jest.fn();
            const userAddArray = [{ value: 'picker', label: 'picker' } as SingleOptionType, { value: '1', label: '1' } as SingleOptionType]
            const selectedAdUser = userAddArray[0]

            const { getByLabelText } = render(<AdministrationRecruitmentGenerator selectedAdUser={selectedAdUser}
                userAdArray={userAddArray}
                setSelectedAdUser={dispatch} />)

            await selectEvent.select(getByLabelText('Template Creator:'), "picker");

            expect(dispatch).toBeCalled()
        })
    })
})