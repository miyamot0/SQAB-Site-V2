/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Select, { SingleValue } from "react-select";
import { SingleOptionType } from "../../tools/types/GeneralTypes";
import { ProfileActions } from "../types/ProfileActionTypes";

export interface SelectFieldEntryProps {
    label: string | undefined;
    options: SingleOptionType[];
    currentValue: SingleOptionType | undefined;
    type: number;
    dispatch: (value: ProfileActions) => void;
}

/** StandardEntryFieldSelectSingle

 * @param {string} label value to display
 * @param {any[]} options options to display
 * @param {SingleOptionType | undefined} currentValue value to display
 * @param {number} type enum related to dispatch/reducer
 * @param {function} dispatch dispatch callback
 * @returns {JSX.Element}
 */
export function StandardEntryFieldSelectSingle({ label, options, currentValue, type, dispatch }: SelectFieldEntryProps): JSX.Element {
    return (
        <>
            <label htmlFor="single-field" className="select-label">
                {label}:
            </label>
            <Select
                name={"single-field"}
                inputId={"single-field"}
                options={options}
                onChange={(option: SingleValue<SingleOptionType>) => {
                    dispatch({
                        type: type,
                        payload: option,
                    });
                }}
                value={currentValue}
            />
        </>
    );
}