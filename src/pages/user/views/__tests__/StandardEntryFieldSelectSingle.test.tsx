
/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import selectEvent from "react-select-event";
import { StandardEntryFieldSelectSingle } from "../StandardEntryFieldSelectSingle";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

describe("StandardEntryFieldSelectSingle", () => {
    it("Should fire dispatch", async () => {
        await act(async () => {
            const label = "single-select";
            const dispatch = jest.fn();

            const options = [
                { value: "K", label: "Kindergarten" },
                { value: "1st", label: "First Grade" },
                { value: "2nd", label: "Second Grade" },
                { value: "3rd", label: "Third Grade" },
                { value: "4th", label: "Fourth Grade" },
                { value: "5th", label: "Fifth Grade" },
                { value: "6th", label: "Sixth Grade" },
            ];

            const currentValue = options[0];

            const { getByLabelText } = render(
                <StandardEntryFieldSelectSingle label={label}
                    options={options}
                    currentValue={currentValue}
                    type={0}
                    dispatch={dispatch} />
            );

            await selectEvent.select(getByLabelText(`${label}:`), "Second Grade");

            expect(dispatch).toBeCalled();
        })
    });
});