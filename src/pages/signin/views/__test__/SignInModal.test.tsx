/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode, ReactPortal } from 'react';
import Modal from 'react-modal';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act, fireEvent, render } from '@testing-library/react';
import { SignInModal } from '../SignInModal';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

jest.mock('../../../../firebase/hooks/useFirebaseLogin', () => {
  return {
    ...jest.requireActual('../../../../firebase/hooks/useFirebaseLogin'),
    login: jest.fn(() => true),
  };
});

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
        <SignInModal
          showModal={showModal}
          showPhoneNumber={showPhoneNumber}
          showOTP={showOTP}
          setShowModal={setShowModal}
          setPhoneNumber={setPhoneNumber}
          setOTPNumber={setOTPNumber}
          setShowPhoneNumber={setShowPhoneNumber}
          setConfirmResult={setConfirmResult}
          setShowOTP={setShowOTP}
          phoneNumber={''}
          otpNumber={''}
          login={login}
          confirmResult={confirmResult}
        />,
      );

      //wrapper.find('button').first().simulate('click');
    });
  });

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
        <SignInModal
          showModal={showModal}
          showPhoneNumber={showPhoneNumber}
          showOTP={showOTP}
          setShowModal={setShowModal}
          setPhoneNumber={setPhoneNumber}
          setOTPNumber={setOTPNumber}
          setShowPhoneNumber={setShowPhoneNumber}
          setConfirmResult={setConfirmResult}
          setShowOTP={setShowOTP}
          phoneNumber={''}
          otpNumber={''}
          login={login}
          confirmResult={confirmResult}
        />,
      );

      const inputs = wrapper.find('input');

      expect(inputs.length).toBe(1);
      inputs.first().simulate('change', { target: { value: 'Hello' } });
      expect(setOTPNumber).toBeCalled();

      const mainModal = wrapper.find(Modal).dive();
      const mainModalBtns = mainModal.find('.btn');

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
  });
});

describe('SignInModal - No Portal', () => {
  const oldCreatePortal = ReactDOM.createPortal;

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element as ReactPortal;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  it('should render correctly', async () => {
    const showModal = true;
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

    const { container, getAllByPlaceholderText, getAllByText } = render(
      <SignInModal
        showModal={showModal}
        showPhoneNumber={showPhoneNumber}
        showOTP={showOTP}
        setShowModal={setShowModal}
        setPhoneNumber={setPhoneNumber}
        setOTPNumber={setOTPNumber}
        setShowPhoneNumber={setShowPhoneNumber}
        setConfirmResult={setConfirmResult}
        setShowOTP={setShowOTP}
        phoneNumber={''}
        otpNumber={''}
        login={login}
        confirmResult={confirmResult}
      />,
      {
        container: document.body,
      },
    );

    await act(async () => {
      const input = getAllByPlaceholderText('Enter phone number');
      expect(input.length).toBe(1);

      input.at(0)?.focus();
      input.at(0)?.blur();
      fireEvent.keyPress(input.at(0) as HTMLElement, { key: '1', keyCode: 49, which: 49 });
      fireEvent.keyDown(input.at(0) as HTMLElement, { key: '1', keyCode: 49, which: 49 });
      fireEvent.keyUp(input.at(0) as HTMLElement, { key: '1', keyCode: 49, which: 49 });

      const input2 = getAllByPlaceholderText('e.g., 123456');
      expect(input2.length).toBe(1);

      input2.at(0)?.focus();
      input2.at(0)?.blur();
      fireEvent.keyPress(input2.at(0) as HTMLElement, { key: '1', keyCode: 49, which: 49 });
      fireEvent.keyDown(input2.at(0) as HTMLElement, { key: '1', keyCode: 49, which: 49 });
      fireEvent.keyUp(input2.at(0) as HTMLElement, { key: '1', keyCode: 49, which: 49 });

      const button1 = getAllByText('Enter Number');
      expect(button1.length).toBe(1);
      button1.at(0)?.click();

      const button2 = getAllByText('Enter OTP');
      expect(button2.length).toBe(1);
      button2.at(0)?.click();

      fireEvent.click(document.body);
    });

    //expect(getAllByPlaceholderText('Enter phone number').at(0)?.innerText).toBe('1');

    //expect(container.innerHTML).toStrictEqual('asdf');
  });
});
