/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from "react-modal";
import { PosterSubmission } from '../../../../firebase/types/RecordTypes';
import { timestamp } from '../../../../firebase/config';
import { PosterPanel } from '../PosterPanel';
import * as FBHooks from '../../../../firebase/hooks/useFirebaseCollection';
import * as FBFunctions from '../../../../firebase/hooks/useFirebaseFunction';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('PosterPanel', () => {
    const collSpy = jest.spyOn(FBHooks, 'useFirebaseCollectionTyped');

    it('Should render with data', () => {
        const spyRecruitment = jest.spyOn(FBFunctions, 'updateStatusForRecruitment');
        const jestFn = jest.fn();
        spyRecruitment.mockImplementation(jestFn);

        collSpy.mockReturnValue({
            documents: [
                {
                    name: 'a',
                    title: '',
                    email: '',
                    abstract: '',
                    list: '',
                    time: timestamp.fromDate(new Date()),
                    presenter: true,
                    reviewed: true,
                    id: ''
                } as PosterSubmission,
                {
                    name: 'c',
                    title: '',
                    email: '',
                    abstract: '',
                    list: '',
                    time: timestamp.fromDate(new Date()),
                    presenter: false,
                    reviewed: false,
                    id: ''
                } as PosterSubmission,
                {
                    name: 'b',
                    title: '',
                    email: '',
                    abstract: '',
                    list: '',
                    time: timestamp.fromDate(new Date()),
                    presenter: false,
                    reviewed: false,
                    id: undefined
                } as PosterSubmission,
                {
                    name: undefined,
                    title: '',
                    email: '',
                    abstract: '',
                    list: '',
                    time: timestamp.fromDate(new Date()),
                    presenter: false,
                    reviewed: false,
                    id: undefined
                } as unknown as PosterSubmission,
            ] as PosterSubmission[],
            error: undefined
        })

        const wrapper = mount(<PosterPanel />)

        wrapper.findWhere(node => {
            return node.type() === 'a' && node.text() === "Send Confirmation Emails";
        }).simulate('click');

        wrapper.findWhere(node => {
            return node.type() === 'a' && node.text() === "Download Results to File";
        }).simulate('click');

        wrapper.find('.button-color-override-green').first().simulate('click');
    })
})