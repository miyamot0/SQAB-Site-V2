/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from "enzyme";
import firebase from "firebase";
import React from "react";
import ReactModal from "react-modal";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BasicAdministrator from "../BasicAdministrator";
import * as AuthHooks from '../../../context/hooks/useAuthorizationContext'
import * as FBHooks from '../../../firebase/hooks/useFirebaseCollection';
import * as FBFunctions from '../../../firebase/hooks/useFirebaseFunction';
import { DiversityFunctionResponse, RecruitmentFunctionResponse } from "../../../firebase/types/FunctionTypes";
import { BarChartEntry, DemographicsBarChartInterface } from "../views/DemographicsBarChart";
import { act } from "react-dom/test-utils";
import { timestamp } from '../../../firebase/config'

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockDiversityResponse: DiversityFunctionResponse = {
    status: 'string',
    message: 'string',
    genderData: {
        name: 'string',
        data: [{
            name: 'string',
            y: 1
        }] as BarChartEntry[]
    } as DemographicsBarChartInterface,
    eduData: {
        name: 'string',
        data: [{
            name: 'string',
            y: 1
        }] as BarChartEntry[]
    } as DemographicsBarChartInterface,
    ageData: {
        name: 'string',
        data: [{
            name: 'string',
            y: 1
        }] as BarChartEntry[]
    } as DemographicsBarChartInterface,
    sexData: {
        name: 'string',
        data: [{
            name: 'string',
            y: 1
        }] as BarChartEntry[]
    } as DemographicsBarChartInterface,
    dataTableNationality: {
        name: 'string',
        data: {
            columns: [{
                label: "string",
                field: "string"
            }],
            rows: [{
                country: 'asdf',
                counts: 1,
            }]
        }
    },
    dataTableRaceEthnicity: {
        name: 'string',
        data: {
            columns: [{
                label: "string",
                field: "string"
            }],
            rows: [{
                country: 'asdf',
                counts: 1,
            }]
        }
    }
}

const mockStudentFxResult: RecruitmentFunctionResponse = {
    status: 'string',
    message: 'string',
    arrayUsersNeedAds: [{ value: '', label: '' }]
}

const mockDate = timestamp.fromDate(new Date());

/*
jest.mock("../../../firebase/hooks/useFirebaseCollection", () => ({
    useFirebaseCollectionTyped: jest.fn()
        .mockReturnValueOnce({
            documents: [{
                Bio: '',
                Contact: '',
                Cycle: '',
                Mentor: '',
                Position: '',
                Name: '',
                Description: 'string',
                Institution: 'string',
                Link: 'string',
                LabLink: 'string',
                Approved: false,
                id: 'string',
            }],
        })
        .mockReturnValueOnce({
            documents: [{
                name: 'string',
                title: 'string',
                email: 'string',
                abstract: 'string',
                list: 'string',
                time: mockDate,
                presenter: true,
                reviewed: true,
                id: ''
            }],
        }),

}));
*/

describe('Basic Administrator', () => {
    const dispatch = jest.fn();
    const authSpy = jest.spyOn(AuthHooks, 'useAuthorizationContext');
    const divSpy = jest.spyOn(FBFunctions, 'getAggregatedDiversityInformation');
    const stuSpy = jest.spyOn(FBFunctions, 'getFilteredRecruitmentInformation');
    //const collSpy = jest.spyOn(FBHooks, 'useFirebaseCollectionTyped')

    it('Should render, if responses received', () => {
        act(() => {
            const mockDocs = jest.spyOn(
                FBHooks,
                "useFirebaseCollectionTyped"
            );
            mockDocs
                .mockImplementationOnce(() => ({
                    documents: [{
                        Bio: '',
                        Contact: '',
                        Cycle: '',
                        Mentor: '',
                        Position: '',
                        Name: '',
                        Description: 'string',
                        Institution: 'string',
                        Link: 'string',
                        LabLink: 'string',
                        Approved: false,
                        id: 'string',
                    }],
                    error: undefined,
                }))
                .mockImplementationOnce(() => ({
                    documents: [{
                        name: 'string',
                        title: 'string',
                        email: 'string',
                        abstract: 'string',
                        list: 'string',
                        time: mockDate,
                        presenter: true,
                        reviewed: true,
                        id: ''
                    }],
                    error: undefined
                }));

            /*
            collSpy.mockResolvedValueOnce(Promise.resolve({
                documents: [{
                    Bio: '',
                    Contact: '',
                    Cycle: '',
                    Mentor: '',
                    Position: '',
                    Name: '',
                }],
                error: undefined
            }))

            collSpy.mockReturnValueOnce({
                documents: [mockStudentFxResult],
                error: undefined
            })
            */

            const mockDiversityFx = jest.fn(() => {
                return Promise.resolve({
                    data: mockDiversityResponse
                })
            });
            const mockStudentFx = jest.fn(() => {
                return Promise.resolve({
                    data: mockStudentFxResult
                })
            });

            authSpy.mockReturnValue({
                user: { uid: "123" } as firebase.User,
                authIsReady: true,
                studentRecruitFlag: false,
                systemAdministratorFlag: true,
                diversityReviewFlag: false,
                submissionReviewFlag: false,
                dispatch: dispatch
            })

            divSpy.mockImplementation(mockDiversityFx);
            stuSpy.mockImplementation(mockStudentFx);

            const wrapper = mount(<BasicAdministrator />);

            //wrapper.update();
            //wrapper.render();

            expect(wrapper.find('Demographic Information').length).toBe(1)
            expect(wrapper.find('Authorization for Recruitment').length).toBe(1)
            expect(wrapper.find('Authorization for Posters').length).toBe(1)
        })
    })

    /*

    it('Should render, bad permissions', () => {
        act(() => {
            const mockDiversityFx = jest.fn(() => {
                return Promise.resolve({ data: null as unknown as DiversityFunctionResponse })
            });
            const mockStudentFx = jest.fn(() => {
                return Promise.resolve({
                    data: mockStudentFxResult
                })
            });

            authSpy.mockReturnValue({
                user: { uid: "123" } as firebase.User,
                authIsReady: true,
                studentRecruitFlag: false,
                systemAdministratorFlag: false,
                diversityReviewFlag: false,
                submissionReviewFlag: false,
                dispatch: dispatch
            })

            collSpy.mockReturnValue({
                documents: [],
                error: undefined
            }).mockReturnValue({
                documents: [],
                error: undefined
            })

            divSpy.mockImplementation(mockDiversityFx);

            stuSpy.mockImplementation(mockStudentFx);

            const wrapper = mount(<BasicAdministrator />);

            wrapper.update();
            wrapper.render();

            expect(wrapper.find('Demographic Information').length).toBe(0)
            expect(wrapper.find('Authorization for Recruitment').length).toBe(0)
            expect(wrapper.find('Authorization for Posters').length).toBe(0)
        })
    })

    it('Should render, bad data', () => {
        act(() => {
            const mockDiversityFx = jest.fn(() => {
                return Promise.resolve({ data: null as unknown as DiversityFunctionResponse })
            });
            const mockStudentFx = jest.fn(() => {
                return Promise.resolve({
                    data: null as unknown as RecruitmentFunctionResponse
                })
            });

            authSpy.mockReturnValue({
                user: { uid: "123" } as firebase.User,
                authIsReady: true,
                studentRecruitFlag: true,
                systemAdministratorFlag: false,
                diversityReviewFlag: true,
                submissionReviewFlag: false,
                dispatch: dispatch
            })

            collSpy.mockReturnValue({
                documents: [],
                error: undefined
            }).mockReturnValue({
                documents: [],
                error: undefined
            })

            divSpy.mockImplementation(mockDiversityFx);

            stuSpy.mockImplementation(mockStudentFx);

            const wrapper = mount(<BasicAdministrator />);

            wrapper.update();
            wrapper.render();

            expect(wrapper.find('Demographic Information').length).toBe(0)
            expect(wrapper.find('Authorization for Recruitment').length).toBe(0)
            expect(wrapper.find('Authorization for Posters').length).toBe(0)
        })
    })

    it('Should render, badly formed', () => {
        act(() => {
            const mockDiversityFx = jest.fn(() => {
                return Promise.resolve({ data: { fake: '123', otherFake: '123' } as unknown as DiversityFunctionResponse })
            });
            const mockStudentFx = jest.fn(() => {
                return Promise.resolve({
                    data: { fake: '123' } as unknown as RecruitmentFunctionResponse
                })
            });

            authSpy.mockReturnValue({
                user: { uid: "123" } as firebase.User,
                authIsReady: true,
                studentRecruitFlag: true,
                systemAdministratorFlag: false,
                diversityReviewFlag: true,
                submissionReviewFlag: false,
                dispatch: dispatch
            })

            collSpy.mockReturnValue({
                documents: [],
                error: undefined
            }).mockReturnValue({
                documents: [],
                error: undefined
            })

            divSpy.mockImplementation(mockDiversityFx);

            stuSpy.mockImplementation(mockStudentFx);

            const wrapper = mount(<BasicAdministrator />);

            wrapper.update();
            wrapper.render();

            expect(wrapper.find('Demographic Information').length).toBe(0)
            expect(wrapper.find('Authorization for Recruitment').length).toBe(0)
            expect(wrapper.find('Authorization for Posters').length).toBe(0)
        })
    })
    */
})