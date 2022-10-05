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
import { LayoutProfileBody } from '../LayoutProfileBody';
import { IndividualUserRecord } from '../../../../firebase/types/RecordTypes';
import { SingleOptionType } from '../../../tools/types/GeneralTypes';
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces';
import * as ProfileHelpers from '../../helpers/ProfileHelpers'

const spyProfileCallback = jest.spyOn(ProfileHelpers, 'updateProfileCallback');
spyProfileCallback.mockResolvedValue(Promise.resolve());

Enzyme.configure({ adapter: new Adapter() });

describe('LayoutProfileBody', () => {
    it('Should render, not phone authed', async () => {

        const state = {
            userEmail: '',
            userInstitution: '',
            userName: '',
            userPhone: '',
            canPostAd: false,
            perms: '',
            id: undefined,
            formError: undefined,
            phoneAuthed: false,
            didBuild: false,
            userEducation: { label: '', value: '' } as SingleOptionType,
            userGender: { label: '', value: '' } as SingleOptionType,
            userAge: { label: '', value: '' } as SingleOptionType,
            userRaceEthnicity: [{ label: '', value: '' } as SingleOptionType],
            userOrientation: { label: '', value: '' } as SingleOptionType,
            userLanguage: { label: '', value: '' } as SingleOptionType,
            userNationality: { label: '', value: '' } as SingleOptionType,
        } as IndividualUserRecord;

        const updateDocument = jest.fn();
        const response = {} as FirestoreState;
        const dispatch = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-types
        let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

        await act(async () => {
            wrapper = mount(<LayoutProfileBody state={state}
                id={'123'}
                history={undefined} updateDocument={updateDocument} response={response} dispatch={dispatch} />)

            await waitFor(() => {
                expect(wrapper.html().toString().includes("Edit Profile Information")).toBe(true)
            })
        })
    })

    it('Should render, phone authed', async () => {
        const state = {
            userEmail: '',
            userInstitution: '',
            userName: '',
            userPhone: '12345678910',
            canPostAd: false,
            perms: '',
            id: undefined,
            formError: undefined,
            phoneAuthed: true,
            didBuild: false,
            userEducation: { label: '', value: '' } as SingleOptionType,
            userGender: { label: '', value: '' } as SingleOptionType,
            userAge: { label: '', value: '' } as SingleOptionType,
            userRaceEthnicity: [{ label: '', value: '' } as SingleOptionType],
            userOrientation: { label: '', value: '' } as SingleOptionType,
            userLanguage: { label: '', value: '' } as SingleOptionType,
            userNationality: { label: '', value: '' } as SingleOptionType,
        } as IndividualUserRecord;

        const updateDocument = jest.fn();
        const response = {} as FirestoreState;
        const dispatch = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-types
        let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

        await act(async () => {
            wrapper = mount(<LayoutProfileBody state={state}
                id={'123'}
                history={undefined} updateDocument={updateDocument} response={response} dispatch={dispatch} />)

            await waitFor(() => {
                expect(wrapper.html().toString().includes("Edit Profile Information")).toBe(true)
            })
        })

        act(() => {
            wrapper.find('.button-fit-card').first().simulate('submit')
        })
    })

    it('Should render, complete data', async () => {
        const state = {
            userEmail: '',
            userInstitution: '',
            userName: '',
            userPhone: '12345678910',
            canPostAd: false,
            perms: '',
            id: undefined,
            formError: undefined,
            phoneAuthed: true,
            didBuild: false,
            userEducation: { label: '1', value: '1' } as SingleOptionType,
            userGender: { label: '1', value: '1' } as SingleOptionType,
            userAge: { label: '1', value: '1' } as SingleOptionType,
            userRaceEthnicity: [{ label: '1', value: '1' } as SingleOptionType],
            userOrientation: { label: '1', value: '1' } as SingleOptionType,
            userLanguage: { label: '1', value: '1' } as SingleOptionType,
            userNationality: { label: '1', value: '1' } as SingleOptionType,
        } as IndividualUserRecord;

        const updateDocument = jest.fn();
        const response = {} as FirestoreState;
        const dispatch = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-types
        let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

        await act(async () => {
            wrapper = mount(<LayoutProfileBody state={state}
                id={'123'}
                history={undefined} updateDocument={updateDocument} response={response} dispatch={dispatch} />)

            await waitFor(() => {
                expect(wrapper.html().toString().includes("Edit Profile Information")).toBe(true)
            })
        })

        act(() => {
            wrapper.find('.button-fit-card').first().simulate('submit')
        })
    })
})