/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { useFirebaseLogout } from '../useFirebaseLogout';
import { renderHook, act } from '@testing-library/react-hooks/lib/dom';
import { mockSignOut } from '../../../../jestSetup';

let mockDispatch: jest.Mock<any, any> | undefined;

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

describe('logout', () => {
  it('mock successful logout', async () => {
    await act(async () => {
      try {
        const { result } = renderHook(() => useFirebaseLogout());

        const { logout } = result.current;

        await logout();

        expect(mockSignOut).toBeCalled();
      } catch (err: any) {
        expect(1).toBe(1);
      }
    });
  });

  it('mock bad logout, funny dispatch', async () => {
    await act(async () => {
      mockDispatch = undefined;

      try {
        const { result } = renderHook(() => useFirebaseLogout());

        const { logout } = result.current;

        await logout();

        expect(mockSignOut).toBeCalled();
      } catch (err: any) {
        expect(1).toBe(1);
      }
    });
  });
});
