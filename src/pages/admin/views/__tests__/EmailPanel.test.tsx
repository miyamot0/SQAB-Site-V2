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
import { timestamp } from '../../../../firebase/config';
import { EmailStatus, PosterSubmission } from '../../../../firebase/types/RecordTypes';
import { PosterPanel } from '../PosterPanel';
import * as FBHooks from '../../../../firebase/hooks/useFirebaseCollection';
import * as FBFunctions from '../../../../firebase/hooks/useFirebaseFunction';
import { EmailPanel } from '../EmailPanel';
import { MDBCardBody } from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import { projectFunctions } from '../../../../firebase/config';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const jestTotalFunctions = jest.fn().mockResolvedValue(true);
const spyTotalFunctions = jest.spyOn(projectFunctions, 'httpsCallable');
spyTotalFunctions.mockImplementation(jestTotalFunctions);

const mockTime1 = timestamp.fromDate(new Date());
const mockTime2 = timestamp.fromDate(new Date('10/3/2022'));

jest.mock('../../../../firebase/hooks/useFirebaseCollection', () => {
  const originalModule = jest.requireActual('../../../../firebase/hooks/useFirebaseCollection');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      useFirebaseCollectionTyped: {
        documents: [
          {
            delivery: {
              attempts: 1,
              endTime: mockTime1,
              error: 'string',
              leaseExpireTime: 'string',
              startTime: mockTime1,
              state: 'string',
            },
            template: null,
            to: ['string[]'],
          } as EmailStatus,

          {
            delivery: {
              attempts: 1,
              endTime: mockTime2,
              error: 'string',
              leaseExpireTime: 'string',
              startTime: mockTime2,
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
      },
    }),
  };
});

describe('EmailPanel', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render with data', () => {
    const spyRecruitment = jest.spyOn(FBFunctions, 'updateStatusForRecruitment');
    const jestFn = jest.fn();
    spyRecruitment.mockImplementation(jestFn);

    const wrapper = mount(<EmailPanel />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);
  });
});
