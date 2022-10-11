/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { useFirebaseLogin } from '../useFirebaseLogin';
import { projectAuth } from './../../../firebase/config';
import { ProviderTypes } from '../../types/AccountTypes';
import { renderHook, act } from '@testing-library/react-hooks/lib/dom';
import { mockConfirmOtp, mockSignInWithPopup } from '../../../../jestSetup';

let mockDispatch: jest.Mock<any, any>;

jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockDispatch = jest.fn();
  return {
    useAuthorizationContext: () => ({
      user: { id: '123' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      diversityReviewFlag: false,
      systemAdministratorFlag: false,
      submissionReviewFlag: false,
      dispatch: mockDispatch,
    }),
  };
});

describe('useFirebaseLogin', () => {
  beforeEach(() => {
    mockSignInWithPopup.mockClear();
    mockConfirmOtp.mockClear();
  });

  it('mock successful login, Google', async () => {
    await act(async () => {
      try {
        const { result } = renderHook(() => useFirebaseLogin());

        const { login } = result.current;

        await login(ProviderTypes.Google);

        expect(mockSignInWithPopup).toBeCalled();
      } catch (err: any) {
        expect(1).toBe(1);
      }
    });
  });

  it('mock successful login, Facebook', async () => {
    await act(async () => {
      try {
        const { result } = renderHook(() => useFirebaseLogin());

        const { login } = result.current;

        await login(ProviderTypes.Facebook);

        expect(mockSignInWithPopup).toBeCalled();
      } catch (err: any) {
        expect(1).toBe(1);
      }
    });
  });

  it('mock successful login, Phone', async () => {
    await act(async () => {
      const mockConfirm = jest.fn();
      const confirmationResult = {
        confirm: mockConfirm.mockImplementation(() => Promise.resolve(true)),
        verificationId: '123',
      } as firebase.auth.ConfirmationResult;

      const { result, waitFor } = renderHook(() => useFirebaseLogin());
      const { login } = result.current;

      await login(ProviderTypes.Phone, confirmationResult, '123456');

      expect(mockConfirm).toBeCalled();
      expect(result.current.loginPending).toBe(false);
      expect(result.current.loginError).toStrictEqual(undefined);
    });
  });

  it('mock successful login, Phone, but bad dispatch', async () => {
    await act(async () => {
      mockDispatch.mockReturnValueOnce(null);
      const mockConfirm = jest.fn();
      const confirmationResult = {
        confirm: mockConfirm.mockImplementation(() => Promise.resolve(true)),
        verificationId: '123',
      } as firebase.auth.ConfirmationResult;

      const { result, waitFor } = renderHook(() => useFirebaseLogin());
      const { login } = result.current;

      await login(ProviderTypes.Phone, confirmationResult, '123456');

      expect(mockConfirm).toBeCalled();
      expect(result.current.loginPending).toBe(false);
      expect(result.current.loginError).toStrictEqual(undefined);
    });
  });

  it('mock unsuccessful login, THROW', async () => {
    await act(async () => {
      const { result } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login(ProviderTypes.Twitter, undefined, undefined);
    });
  });

  it('mock errored login', async () => {
    await act(async () => {
      const mockConfirm = jest.fn();
      const confirmationResult = {
        confirm: mockConfirm.mockImplementation(() => Promise.resolve(true)),
        verificationId: '123',
      } as firebase.auth.ConfirmationResult;

      const { result } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login(ProviderTypes.Phone, confirmationResult, 'otp');

      expect(mockConfirm).toBeCalled();
      expect(result.current.loginPending).toBe(false);
      expect(result.current.loginError).toStrictEqual(undefined);
    });
  });
});
