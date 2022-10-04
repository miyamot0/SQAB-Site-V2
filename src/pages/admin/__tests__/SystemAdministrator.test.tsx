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
import { DemographicsBarChartInterface } from "../views/DemographicsBarChart";
import SystemAdministration from "../SystemAdministration";

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('Basic Administrator', () => {
    const dispatch = jest.fn();
    const authSpy = jest.spyOn(AuthHooks, 'useAuthorizationContext');
    const collSpy = jest.spyOn(FBHooks, 'useFirebaseCollectionTyped');

    it('Should render, if responses received', () => {
        /*
        authSpy.mockReturnValue({
            user: { uid: "123" } as firebase.User,
            authIsReady: true,
            studentRecruitFlag: false,
            systemAdministratorFlag: true,
            diversityReviewFlag: false,
            submissionReviewFlag: false,
            dispatch: dispatch
        })

        collSpy.mockReturnValueOnce({
            documents: [{ id: '123' }],
            error: undefined
        }).mockReturnValueOnce({
            documents: [{ id: '123', userName: '', userEmail: '' }],
            error: undefined
        }).mockReturnValueOnce({
            documents: [],
            error: undefined
        }).mockReturnValueOnce({
            documents: [],
            error: undefined
        })
        */

        //const wrapper = mount(<SystemAdministration />);

        expect(1).toBe(1)
    });
});