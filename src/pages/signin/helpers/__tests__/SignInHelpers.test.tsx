/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProviderTypes } from '../../../../firebase/types/AccountTypes';
import { postOTPEntryCall } from '../SignInHelpers';

const mockLogin = jest.fn();

jest.mock('../../../../firebase/hooks/useFirebaseLogin', () => {
  return {
    login: mockLogin,
  };
});

describe('SignInHelpers', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

  afterAll(() => {
    spyAlert.mockReset();
  });

  it('Should show appropriate modal, if good', async () => {
    const confirmResult = '';
    const optNumber = '';
    const setShowModal = jest.fn();

    await postOTPEntryCall(mockLogin, confirmResult, optNumber, setShowModal);

    expect(mockLogin).toBeCalled();
    expect(setShowModal).toBeCalled();
  });

  it('Should throw, if bad', async () => {
    mockLogin.mockClear();
    mockLogin.mockReset();
    const confirmResult = '';
    const optNumber = '';
    const setShowModal = jest.fn();

    mockLogin.mockImplementation(() => {
      throw new Error();
    });
    await postOTPEntryCall(mockLogin, confirmResult, optNumber, setShowModal);

    expect(mockLogin).toBeCalled();
    expect(spyAlert).toBeCalled();
  });
});
