/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { InitialRecruitmentState, RecruitmentEditAction, RecruitmentEditReducer } from "../UserRecruitmentFunctionality";

//const waitForComponentToPaint = async (wrapper) => {
//    await act(async () => {
//        await new Promise(resolve => setTimeout(resolve));
//        wrapper.update();
//    });
//};

describe("UserRecruitmentFunctionality", () => {
    it("Should return base state", () => {
        const { result } = renderHook(() =>
            useReducer(RecruitmentEditReducer, InitialRecruitmentState)
        );

        const [state] = result.current;

        expect(InitialRecruitmentState).toBe(state);
    });

    it("dispatch: Mass fire all", async () => {
        const { result } = renderHook(() =>
            useReducer(RecruitmentEditReducer, InitialRecruitmentState)
        );

        const [, dispatch] = result.current;


        await act(async () => {
            dispatch({ type: RecruitmentEditAction.EditPosition, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].Position).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.EditMentorBio, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].Bio).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.EditDescription, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].Description).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.EditLink, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].Link).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.EditDate, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].Cycle).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.EditLabLink, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].LabLink).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.LoadUser, payload: { Position: '1' }, });
            await waitFor(() => {
                expect(result.current[0].Position).toBe('1')
            })
            dispatch({ type: RecruitmentEditAction.LoadRecruitment, payload: { Position: '1' }, });
            await waitFor(() => {
                expect(result.current[0].Position).toBe('1')
            })
            dispatch({ type: 999, payload: '', });
        })
    });
});