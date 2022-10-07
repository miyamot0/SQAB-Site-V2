/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
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

    it("dispatch: Mass fire all", async () => {
        const { result } = renderHook(() =>
            useReducer(UserEditReducer, InitialUserState)
        );

        const [, dispatch] = result.current;

        const select = { value: '', label: '' } as SingleOptionType;

        await act(async () => {
            dispatch({ type: UserEditAction.Email, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].userEmail).toBe('1')
            })
            dispatch({ type: UserEditAction.Institution, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].userInstitution).toBe('1')
            })
            dispatch({ type: UserEditAction.Name, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].userName).toBe('1')
            })
            dispatch({ type: UserEditAction.EditFormError, payload: '1', });
            await waitFor(() => {
                expect(result.current[0].formError).toBe('1')
            })
            dispatch({ type: UserEditAction.EditPhoneAuthed, payload: true, });
            await waitFor(() => {
                expect(result.current[0].phoneAuthed).toBe(true)
            })
            dispatch({ type: UserEditAction.EditDidBuild, payload: true, });
            await waitFor(() => {
                expect(result.current[0].didBuild).toBe(true)
            })

            dispatch({ type: UserEditAction.EditEducation, payload: select, });
            await waitFor(() => {
                expect(result.current[0].userEducation).toBe(select)
            })
            dispatch({ type: UserEditAction.EditGender, payload: select, });
            await waitFor(() => {
                expect(result.current[0].userGender).toBe(select)
            })
            dispatch({ type: UserEditAction.EditAge, payload: select, });
            await waitFor(() => {
                expect(result.current[0].userAge).toBe(select)
            })
            dispatch({ type: UserEditAction.EditRaceEthnicity, payload: [select], });
            await waitFor(() => {
                expect(result.current[0].userRaceEthnicity).toStrictEqual([select])
            })
            dispatch({ type: UserEditAction.EditOrientation, payload: select, });
            await waitFor(() => {
                expect(result.current[0].userOrientation).toBe(select)
            })
            dispatch({ type: UserEditAction.EditLanguage, payload: select, });
            await waitFor(() => {
                expect(result.current[0].userLanguage).toBe(select)
            })
            dispatch({ type: UserEditAction.EditNationality, payload: select, });
            await waitFor(() => {
                expect(result.current[0].userNationality).toBe(select)
            })
            dispatch({ type: UserEditAction.Load, payload: {}, });
            await waitFor(() => {
                expect(result.current[0]).toStrictEqual({})
            })
            const preState = result.current[0]
            await waitFor(() => {
                expect(() => dispatch({ type: 999, payload: '', })).not.toBe(preState)
            })
        })
    });
});