/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { RecruitmentAd } from '../../../../firebase/types/RecordTypes';
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces';
import { LayoutRecruitmentBody } from '../LayoutRecruitmentBody';

import * as RecruitmentHelpers from '../../helpers/RecruitmentHelpers'

const spyProfileCallback = jest.spyOn(RecruitmentHelpers, 'handleEditRecruitmentSubmit');
spyProfileCallback.mockResolvedValue(Promise.resolve());

jest.mock('../../../../firebase/hooks/useFirestore', () => {
    const originalModule = jest.requireActual('../../../../firebase/hooks/useFirestore');
    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            updateDocument: jest.fn(),
            response: {} as FirestoreState,
        }),
    };
});

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';

const mockRecruitmentAd = {
    Bio: 'string',
    Contact: 'string',
    Cycle: 'string',
    Description: 'string',
    Institution: 'string',
    Link: 'string',
    LabLink: 'string',
    Mentor: 'string',
    Name: 'string',
    Position: 'string',
    Approved: false,
    id: mockId,
};

describe('LayoutRecruitmentBody', () => {
    it('Should render, but data is incomplete', async () => {

        const state = mockRecruitmentAd as RecruitmentAd;

        const updateDocument = jest.fn();
        const response = {} as FirestoreState;
        const dispatch = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-types
        let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

        await act(async () => {
            wrapper = mount(<LayoutRecruitmentBody state={{
                ...state,
                Name: ''
            }}
                id={'123'}
                history={undefined} updateDocument={updateDocument} response={response} dispatch={dispatch} />)

            await waitFor(() => {
                expect(wrapper.html().toString().includes("Recruitment Details")).toBe(true)
            })
        })

        act(() => {
            wrapper.find('input').forEach((input) => {
                input.simulate('change', { target: { value: '1' } })
            })

            wrapper.find('textarea').forEach((input) => {
                input.simulate('change', { target: { value: '1' } })
            })

            wrapper.find('.button-fit-card').first().simulate('click')
        })
    })

    it('Should render, data is complete', async () => {

        const state = mockRecruitmentAd as RecruitmentAd;

        const updateDocument = jest.fn();
        const response = {} as FirestoreState;
        const dispatch = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-types
        let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

        await act(async () => {
            wrapper = mount(<LayoutRecruitmentBody state={state}
                id={'123'}
                history={undefined} updateDocument={updateDocument} response={response} dispatch={dispatch} />)

            await waitFor(() => {
                expect(wrapper.html().toString().includes("Recruitment Details")).toBe(true)
            })
        })

        act(() => {
            wrapper.find('.button-fit-card').first().simulate('click')
        })
    })
});