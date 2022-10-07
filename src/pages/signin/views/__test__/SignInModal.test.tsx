/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Modal from 'react-modal';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from '@testing-library/react';
import { SignInModal } from '../SignInModal';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../../firebase/hooks/useFirebaseLogin', () => {
    return {
        ...jest.requireActual('../../../../firebase/hooks/useFirebaseLogin'),
        login: jest.fn(() => true),
    }
})

describe('SignInModal', () => {
    it('On load, nothing shown', async () => {
        const showModal = false;
        const showPhoneNumber = false;
        const showOTP = false;

        const setShowModal = jest.fn();
        const setPhoneNumber = jest.fn();
        const setOTPNumber = jest.fn();
        const setShowPhoneNumber = jest.fn();
        const setConfirmResult = jest.fn();
        const setShowOTP = jest.fn();

        const login = jest.fn();
        const confirmResult = jest.fn();

        await act(async () => {
            const wrapper = shallow(
                <SignInModal showModal={showModal} showPhoneNumber={showPhoneNumber} showOTP={showOTP}
                    setShowModal={setShowModal} setPhoneNumber={setPhoneNumber} setOTPNumber={setOTPNumber}
                    setShowPhoneNumber={setShowPhoneNumber} setConfirmResult={setConfirmResult} setShowOTP={setShowOTP}
                    phoneNumber={''} otpNumber={''} login={login} confirmResult={confirmResult} />,
            );

            //wrapper.find('button').first().simulate('click');
        });
    })

    it('On load, all shown', async () => {
        const showModal = true;
        const showPhoneNumber = true;
        const showOTP = true;

        const setShowModal = jest.fn();
        const setPhoneNumber = jest.fn();
        const setOTPNumber = jest.fn();
        const setShowPhoneNumber = jest.fn();
        const setConfirmResult = jest.fn();
        const setShowOTP = jest.fn();

        const login = jest.fn();
        const confirmResult = jest.fn();

        await act(async () => {
            const wrapper = shallow(
                <SignInModal showModal={showModal} showPhoneNumber={showPhoneNumber} showOTP={showOTP}
                    setShowModal={setShowModal} setPhoneNumber={setPhoneNumber} setOTPNumber={setOTPNumber}
                    setShowPhoneNumber={setShowPhoneNumber} setConfirmResult={setConfirmResult} setShowOTP={setShowOTP}
                    phoneNumber={''} otpNumber={''} login={login} confirmResult={confirmResult} />,
            );

            const inputs = wrapper.find('input');

            expect(inputs.length).toBe(1)
            inputs.first().simulate('change', { target: { value: 'Hello' } })
            expect(setOTPNumber).toBeCalled();

            const mainModal = wrapper.find(Modal).dive();
            const mainModalBtns = mainModal.find('.btn')

            //const btns = wrapper.find('.btn')
            //expect(btns.length).toEqual(2);

            const closeButton = wrapper.find('.button-close-modal');
            expect(closeButton.length).toEqual(1);
            closeButton.simulate('click');

            //a
            //.PhoneInputCountrySelect


            //const buttons = wrapper.find('a');
            //expect(buttons.length).toEqual(3)
            //expect(labels.first().html()).toStrictEqual('')


            //wrapper.find('button').first().simulate('click');
        });
    })
});