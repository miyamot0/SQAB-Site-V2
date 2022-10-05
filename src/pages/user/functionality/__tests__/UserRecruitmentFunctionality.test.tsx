
/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { InitialRecruitmentState, RecruitmentEditAction, RecruitmentEditReducer } from "../UserRecruitmentFunctionality";

describe("UserRecruitmentFunctionality", () => {
    it("Should return base state", () => {
        const { result } = renderHook(() =>
            useReducer(RecruitmentEditReducer, InitialRecruitmentState)
        );

        const [state] = result.current;

        expect(InitialRecruitmentState).toBe(state);
    });

    it("dispatch: Mass fire all", () => {
        const { result } = renderHook(() =>
            useReducer(RecruitmentEditReducer, InitialRecruitmentState)
        );

        const [, dispatch] = result.current;

        dispatch({ type: RecruitmentEditAction.LoadUser, payload: {}, });
        dispatch({ type: RecruitmentEditAction.LoadRecruitment, payload: {}, });
        dispatch({ type: RecruitmentEditAction.EditPosition, payload: '', });
        dispatch({ type: RecruitmentEditAction.EditMentorBio, payload: '', });
        dispatch({ type: RecruitmentEditAction.EditDescription, payload: '', });
        dispatch({ type: RecruitmentEditAction.EditLink, payload: '', });
        dispatch({ type: RecruitmentEditAction.EditDate, payload: '', });
        dispatch({ type: RecruitmentEditAction.EditLabLink, payload: '', });
        dispatch({ type: 999, payload: '', });
    });
});