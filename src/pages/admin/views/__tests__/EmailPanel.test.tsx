/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
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

let mockUseFirebaseCollectionTyped: jest.Mock<any, any>;

// TODO: rep GOOD document mock
jest.mock('../../../../firebase/hooks/useFirebaseCollection', () => {
  mockUseFirebaseCollectionTyped = jest.fn();

  //const mockTime1 = firebase.firestore.Timestamp.now();
  //const mockTime2 = firebase.firestore.Timestamp.now();

  return {
    useFirebaseCollectionTyped: mockUseFirebaseCollectionTyped,
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

  it('Should render with data, docs should be good', () => {
    const spyRecruitment = jest.spyOn(FBFunctions, 'updateStatusForRecruitment');
    const jestFn = jest.fn();
    spyRecruitment.mockImplementation(jestFn);

    mockUseFirebaseCollectionTyped.mockReturnValue({
      documents: [
        {
          delivery: {
            attempts: 1,
            endTime: firebase.firestore.Timestamp.now(),
            error: 'string',
            leaseExpireTime: 'string',
            startTime: firebase.firestore.Timestamp.now(),
            state: 'string',
          },
          template: null,
          to: ['string[]'],
        } as EmailStatus,

        {
          delivery: {
            attempts: 1,
            endTime: firebase.firestore.Timestamp.now(),
            error: 'string',
            leaseExpireTime: 'string',
            startTime: firebase.firestore.Timestamp.now(),
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
      error: null,
    });

    const wrapper = mount(<EmailPanel />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);
  });

  it('Should render without data', () => {
    const spyRecruitment = jest.spyOn(FBFunctions, 'updateStatusForRecruitment');
    const jestFn = jest.fn();
    spyRecruitment.mockImplementation(jestFn);

    mockUseFirebaseCollectionTyped.mockReturnValue({
      documents: null,
      error: 'Error',
    });

    const wrapper = mount(<EmailPanel />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);
  });
});
