/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react"
import ReactModal from "react-modal";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from "enzyme"
import { IndividualUserRecordSaved } from "../../../../firebase/types/RecordTypes";
import { UserDashboardLayout } from "../UserDashboardLayout";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('UserDashboardLayout', () => {
    it('Should render, good data', () => {
        const userDocuments = [{}] as IndividualUserRecordSaved[];
        const sysAdminFlag = true;

        const wrapper = mount(<UserDashboardLayout sysAdminFlag={sysAdminFlag} userDocuments={userDocuments} />)

        expect(wrapper.find('h4').length).toBe(1)
    })

    it('Should fail, bad perms', () => {
        const userDocuments = [{}] as IndividualUserRecordSaved[];
        const sysAdminFlag = false;

        const wrapper = mount(<UserDashboardLayout sysAdminFlag={sysAdminFlag} userDocuments={userDocuments} />)

        expect(wrapper.find('h4').length).toBe(0)
    })

    it('Should fail, bad data', () => {
        const userDocuments = null as unknown as IndividualUserRecordSaved[];
        const sysAdminFlag = true;

        const wrapper = mount(<UserDashboardLayout sysAdminFlag={sysAdminFlag} userDocuments={userDocuments} />)

        expect(wrapper.find('h4').length).toBe(0)
    })
})