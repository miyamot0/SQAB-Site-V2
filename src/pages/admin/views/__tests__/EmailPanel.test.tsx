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
import ReactModal from 'react-modal';
import { EmailStatus, PosterSubmission } from '../../../../firebase/types/RecordTypes';
import { timestamp } from '../../../../firebase/config';
import { PosterPanel } from '../PosterPanel';
import * as FBHooks from '../../../../firebase/hooks/useFirebaseCollection';
import * as FBFunctions from '../../../../firebase/hooks/useFirebaseFunction';
import { EmailPanel } from '../EmailPanel';
import { MDBCardBody } from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';

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
          delivery: {
            attempts: 1,
            endTime: timestamp.fromDate(new Date()),
            error: 'string',
            leaseExpireTime: 'string',
            startTime: timestamp.fromDate(new Date()),
            state: 'string',
          },
          template: null,
          to: ['string[]'],
        } as EmailStatus,

        {
          delivery: {
            attempts: 1,
            endTime: timestamp.fromDate(new Date('10/3/2022')),
            error: 'string',
            leaseExpireTime: 'string',
            startTime: timestamp.fromDate(new Date('10/3/2022')),
            state: 'string',
          },
          template: {
            data: {
              name: 'string',
              title: 'string',
            },
            name: 'string',
          },
          to: ['string[]'],
        } as EmailStatus,
      ] as EmailStatus[],
      error: undefined,
    });

    const wrapper = mount(<EmailPanel />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);
  });
});
