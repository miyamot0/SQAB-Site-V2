
/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { SingleOptionType } from "../../../tools/types/GeneralTypes";
import { InitialUserState, UserEditAction, UserEditReducer } from "../UserProfileFunctionality";

describe("UserProfileFunctionality", () => {
    it("Should return base state", () => {
        const { result } = renderHook(() =>
            useReducer(UserEditReducer, InitialUserState)
        );

        const [state] = result.current;

        expect(InitialUserState).toBe(state);
    });

    it("dispatch: Mass fire all", () => {
        const { result } = renderHook(() =>
            useReducer(UserEditReducer, InitialUserState)
        );

        const [, dispatch] = result.current;

        const select = { value: '', label: '' } as SingleOptionType;

        dispatch({ type: UserEditAction.Email, payload: {}, });
        dispatch({ type: UserEditAction.Institution, payload: {}, });
        dispatch({ type: UserEditAction.Name, payload: '', });
        dispatch({ type: UserEditAction.EditEducation, payload: select, });
        dispatch({ type: UserEditAction.EditGender, payload: select, });
        dispatch({ type: UserEditAction.EditAge, payload: select, });
        dispatch({ type: UserEditAction.EditRaceEthnicity, payload: [select], });
        dispatch({ type: UserEditAction.EditOrientation, payload: select, });
        dispatch({ type: UserEditAction.EditLanguage, payload: select, });
        dispatch({ type: UserEditAction.EditNationality, payload: select, });
        dispatch({ type: UserEditAction.EditPhoneAuthed, payload: true, });
        dispatch({ type: UserEditAction.EditFormError, payload: '', });
        dispatch({ type: UserEditAction.EditDidBuild, payload: true, });
        dispatch({ type: UserEditAction.Load, payload: {}, });
        dispatch({ type: 999, payload: '', });
    });
});