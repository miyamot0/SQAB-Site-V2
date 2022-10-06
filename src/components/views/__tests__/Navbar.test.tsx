/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, waitForOptions } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { WaitOptions } from '@testing-library/react-hooks';
import { Navbar } from '../Navbar';
import { AuthorizationContextProvider } from '../../../context/AuthorizationContext';

Enzyme.configure({ adapter: new Adapter() });

let mockUserStatus: jest.Mock<any, any>;
let mockReadyStatus: jest.Mock<any, any>;

jest.mock('../../../context/hooks/useAuthorizationContext', () => {
    mockUserStatus = jest.fn();
    mockReadyStatus = jest.fn();

    return {
        ...jest.requireActual('../../../context/hooks/useAuthorizationContext'),
        user: mockUserStatus.mockReturnValue({ uid: '456' }),
        authIsReady: mockReadyStatus.mockReturnValue(false)
    }
})


describe('Navbar', () => {
    it('On load', async () => {
        mockUserStatus.mockReturnValue({ uid: '456' });
        mockReadyStatus.mockReturnValue(true)

        const toggleView = jest.fn();
        const showBasic = true;
        const openModal = jest.fn();
        const operModal2 = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-types
        let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

        await act(async () => {
            wrapper = mount(
                <AuthorizationContextProvider>
                    <Navbar toggleView={toggleView} showBasic={showBasic} openModal={openModal} openModal2={operModal2} />
                </AuthorizationContextProvider>
            );

            wrapper = wrapper.update()
            wrapper.render();

            wrapper.find('[aria-label="Toggle navigation bar"]').at(0).simulate('click');

            wrapper = wrapper.update()
            wrapper.render()

            wrapper.find('[aria-label="Open listserv modal"]').at(0).simulate('click');

            wrapper = wrapper.update()
            wrapper.render()

            wrapper.find('[aria-label="Open privacy modal"]').at(0).simulate('click');
            //TODO: issue overriding user
        })
    });
});
