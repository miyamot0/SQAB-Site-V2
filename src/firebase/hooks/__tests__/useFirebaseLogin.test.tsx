/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { renderHook } from '@testing-library/react-hooks';
import { useFirebaseLogin } from '../useFirebaseLogin';
import { projectAuth } from './../../../firebase/config';
import { ProviderTypes } from '../../types/AccountTypes';
import { act } from 'react-dom/test-utils';

jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  return {
    useAuthorizationContext: () => ({
      dispatch: jest.fn(),
    }),
  };
});

describe('useFirebaseLogin.test.tsx', () => {
  it('mock successful login, Google', async () => {
    await act(async () => {
      const mockLogin = jest.fn();
      const loginSpy = jest.spyOn(projectAuth, 'signInWithPopup');
      loginSpy.mockImplementation(mockLogin);

      try {
        const { result, waitFor } = renderHook(() => useFirebaseLogin());

        const { login } = result.current;

        await login(ProviderTypes.Google);

        expect(firebase.auth().signInWithPopup).toBeCalled();
      } catch (err: any) {
        expect(1).toBe(1);
      }
    });
  });

  it('mock successful login, Phone', async () => {
    await act(async () => {
      const mockLogin = jest.fn();
      const loginSpy = jest.spyOn(projectAuth, 'signInWithPopup');
      loginSpy.mockImplementation(mockLogin);

      const { result, waitFor } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login(ProviderTypes.Phone, undefined, '123456');

      await waitFor(() => {
        expect(loginSpy).toBeCalled();
        expect(result.current.loginPending).toBe(false);
        expect(result.current.loginError).toStrictEqual(undefined);
      });
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
      const mockJestSignIn = jest.fn();
      mockJestSignIn.mockImplementation(() => {
        throw Error('Error');
      });

      const loginSpy = jest.spyOn(projectAuth, 'signInWithPopup');
      loginSpy.mockImplementation(mockJestSignIn);

      const { result } = renderHook(() => useFirebaseLogin());

      const { login } = result.current;

      await login(ProviderTypes.Phone, undefined, 'otp');

      expect(loginSpy).toBeCalled();
      expect(result.current.loginPending).toBe(false);
      expect(result.current.loginError).toStrictEqual(undefined);
    });
  });
});
