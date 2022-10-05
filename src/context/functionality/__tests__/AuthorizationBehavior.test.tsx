/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useReducer } from 'react';
import {
  authorizationReducer,
  AuthorizationStates,
  InitialAuthorizationState,
} from '../AuthorizationBehavior';

describe('Authorization Behavior: Reducer behavior', () => {
  it('Should load with base state', () => {
    act(() => {
      const { result } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState),
      );

      const [state] = result.current;

      expect(InitialAuthorizationState).toBe(state);
    });
  });

  it('Dispatch test: LOGIN', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState),
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: '123' } as firebase.User;

      dispatch({
        type: AuthorizationStates.LOGIN,
        payloadUser: newAuth,
        payloadStudentRecruitmentFlag: false,
        payloadFlagSysAdmin: false,
        payloadDiversityReviewFlag: false,
        payloadFlagSubmissionReview: false,
      });

      await waitForValueToChange(() => result.current[0].user);

      expect(result.current[0].user).toBe(newAuth);
    });
  });

  it('test dispatch: LOGOUT', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, {
          ...InitialAuthorizationState,
          user: { uid: '123' } as firebase.User,
        }),
      );

      const [, dispatch] = result.current;

      dispatch({
        type: AuthorizationStates.LOGOUT,
        payloadUser: null,
        payloadStudentRecruitmentFlag: false,
        payloadFlagSysAdmin: false,
        payloadDiversityReviewFlag: false,
        payloadFlagSubmissionReview: false,
      });

      await waitForValueToChange(() => result.current[0].user);

      expect(result.current[0].user).toBe(null);
    });
  });

  it('test dispatch: READY', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState),
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: '123' } as firebase.User;

      dispatch({
        type: AuthorizationStates.READY,
        payloadUser: newAuth,
        payloadFlagSysAdmin: true,
        payloadStudentRecruitmentFlag: false,
        payloadDiversityReviewFlag: false,
        payloadFlagSubmissionReview: false,
      });

      await waitForValueToChange(() => result.current[0].user);

      expect(result.current[0].user).toBe(newAuth);
      expect(result.current[0].systemAdministratorFlag).toBe(true);
    });
  });

  it('test dispatch: CLAIMS', async () => {
    await act(async () => {
      const { result, waitForValueToChange } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState),
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: '123' } as firebase.User;

      dispatch({
        type: AuthorizationStates.CLAIMS,
        payloadUser: newAuth,
        payloadFlagSysAdmin: true,
        payloadStudentRecruitmentFlag: true,
        payloadDiversityReviewFlag: true,
        payloadFlagSubmissionReview: true,
      });

      await waitForValueToChange(() => result.current[0].user);

      expect(result.current[0].user).toBe(newAuth);
      expect(result.current[0].systemAdministratorFlag).toBe(true);
      expect(result.current[0].studentRecruitFlag).toBe(true);
      expect(result.current[0].diversityReviewFlag).toBe(true);
      expect(result.current[0].submissionReviewFlag).toBe(true);
    });
  });

  it('test dispatch: THROWERR', () => {
    act(() => {
      const { result } = renderHook(() =>
        useReducer(authorizationReducer, InitialAuthorizationState),
      );

      const [, dispatch] = result.current;

      const newAuth = { uid: '123' } as firebase.User;

      dispatch({
        type: AuthorizationStates.THROWERR,
        payloadUser: newAuth,
        payloadFlagSysAdmin: false,
        payloadStudentRecruitmentFlag: false,
        payloadDiversityReviewFlag: false,
        payloadFlagSubmissionReview: false,
      });

      expect(result.current[0].user).toBe(null);
    });
  });
});
