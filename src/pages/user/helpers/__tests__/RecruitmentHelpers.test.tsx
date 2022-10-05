
/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { act } from "react-dom/test-utils";
import { FirestoreState } from "../../../../firebase/interfaces/FirebaseInterfaces";
import { RecruitmentAd } from "../../../../firebase/types/RecordTypes";
import { dateToYMD, handleEditRecruitmentSubmit } from "../RecruitmentHelpers";

Enzyme.configure({ adapter: new Adapter() });

describe("RecruitmentHelpers", () => {
    const jsdomAlert = window.alert;

    beforeAll(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.alert = () => { }; // provide an empty implementation for window.alert
    });

    afterAll(() => {
        window.alert = jsdomAlert; // restore the jsdom alert
    });

    it("handleEditRecruitmentSubmit, long month", async () => {
        await act(async () => {
            const state = {
                Bio: 'string',
                Contact: 'string',
                Cycle: '10/05/2022',
                Description: 'string',
                Institution: 'string',
                Link: 'string',
                LabLink: 'string',
                Mentor: 'string',
                Name: 'string',
                Position: 'string',
                Approved: false,
                id: "123",
            } as RecruitmentAd;

            const id = "123";

            const updateDocument = jest.fn();
            const response = {} as FirestoreState;
            const history = jest.fn();
            const historyObj = {
                push: history
            };

            await handleEditRecruitmentSubmit(state,
                id, updateDocument, historyObj, response);

            expect(updateDocument).toBeCalled();
            expect(history).toBeCalled();
        })
    });


    it("handleEditRecruitmentSubmit, short month", async () => {
        await act(async () => {
            const state = {
                Bio: 'string',
                Contact: 'string',
                Cycle: '09/05/2022',
                Description: 'string',
                Institution: 'string',
                Link: 'string',
                LabLink: 'string',
                Mentor: 'string',
                Name: 'string',
                Position: 'string',
                Approved: false,
                id: "123",
            } as RecruitmentAd;

            const id = "123";

            const updateDocument = jest.fn();
            const response = {} as FirestoreState;
            const history = jest.fn();
            const historyObj = {
                push: history
            };

            await handleEditRecruitmentSubmit(state,
                id, updateDocument, historyObj, response);

            expect(updateDocument).toBeCalled();
            expect(history).toBeCalled();
        })
    });

    it("handleEditRecruitmentSubmit, Should error out, given bad response", async () => {
        await act(async () => {
            const state = {
                Bio: 'string',
                Contact: 'string',
                Cycle: '10/05/2022',
                Description: 'string',
                Institution: 'string',
                Link: 'string',
                LabLink: 'string',
                Mentor: 'string',
                Name: 'string',
                Position: 'string',
                Approved: false,
                id: "123",
            } as RecruitmentAd;

            const id = "123";

            const updateDocument = jest.fn();
            const response = { error: "Error" } as FirestoreState;
            const history = jest.fn();
            const historyObj = {
                push: history
            };

            await handleEditRecruitmentSubmit(state,
                id, updateDocument, historyObj, response);

            expect(updateDocument).toBeCalled();
            expect(history).not.toBeCalled();
        })
    });

    it("handleEditRecruitmentSubmit, Should error out, given bad response", () => {
        const dateString = "10/05/2022";
        const value = dateToYMD(dateString);
        expect(value).toBe("2022-10-05");
    });
});