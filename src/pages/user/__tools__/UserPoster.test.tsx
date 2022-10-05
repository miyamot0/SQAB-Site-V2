/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';
import { mount } from 'enzyme';
import { timestamp } from '../../../firebase/config';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import UserPoster from './../UserPoster';
import * as UseAuthProvider from '../../../context/hooks/useAuthorizationContext';
import * as UseDocumentMethods from '../../../firebase/hooks/useFirebaseDocument';
import { PosterSubmission } from '../../../firebase/types/RecordTypes';
import { MDBCardTitle } from 'mdb-react-ui-kit';

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';
const mockAuthReturn = jest.fn();
const mockPosterSubmission = {
  name: 'string',
  title: 'string',
  email: 'string',
  abstract: 'string',
  list: 'string',
  time: timestamp.fromDate(new Date()),
  presenter: true,
  reviewed: false,
  id: 'string',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/user/${mockId}` }),
}));

/*
jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  const originalModule = jest.requireActual('../../../context/hooks/useAuthorizationContext');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      useAuthorizationContext: mockAuthReturn,
    }),
  };
});
*/

jest.mock('../../../firebase/hooks/useFirestore', () => {
  const originalModule = jest.requireActual('../../../firebase/hooks/useFirestore');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      updateDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

describe('UserPoster', () => {
  const mockAuthProvider = jest.spyOn(UseAuthProvider, 'useAuthorizationContext');
  const docMockDocument = jest.spyOn(UseDocumentMethods, 'useFirebaseDocumentTyped');

  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  beforeEach(() => {
    mockAuthProvider.mockRestore();
    docMockDocument.mockRestore();
  });

  it('Should render nothing, auth not ready, undefined docs', () => {
    mockAuthProvider.mockImplementation(() => ({
      user: null as unknown as firebase.User,
      authIsReady: undefined as unknown as boolean,
      studentRecruitFlag: false,
      diversityReviewFlag: false,
      systemAdministratorFlag: false,
      submissionReviewFlag: false,
      dispatch: jest.fn(() => true),
    }));

    docMockDocument.mockImplementation(() => ({
      document: undefined,
      documentError: undefined,
    }));

    const wrapper = mount(<UserPoster />);

    // Should not display
    expect(wrapper.find(MDBCardTitle).length).toBe(1);
  });

  it('Should render nothing, but just because auth not ready', () => {
    mockAuthProvider.mockImplementation(() => ({
      user: null as unknown as firebase.User,
      authIsReady: undefined as unknown as boolean,
      studentRecruitFlag: false,
      diversityReviewFlag: false,
      systemAdministratorFlag: false,
      submissionReviewFlag: false,
      dispatch: jest.fn(() => true),
    }));

    docMockDocument.mockImplementation(() => ({
      document: undefined,
      documentError: undefined,
    }));

    const wrapper = mount(<UserPoster />);

    // Should not display
    expect(wrapper.find(MDBCardTitle).length).toBe(1);
  });

  /*
  it('Should render, good auth, firestore error', () => {
    mockAuthProvider.mockImplementation(() => ({
      user: { uid: '456' } as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      diversityReviewFlag: false,
      systemAdministratorFlag: false,
      submissionReviewFlag: false,
      dispatch: jest.fn(() => true),
    }));

    docMockDocument.mockImplementation(({ collectionString, idString }) => {
      return {
        document: undefined,
        documentError: 'Error',
      };
    });

    const wrapper = mount(<UserPoster />);

    // Should not display
    expect(wrapper.find(MDBCardTitle).length).toBe(1);
  });
  */

  /*
  it('Should render, good auth, firestore error', () => {
    docMock.mockImplementation(() => ({
      user: { uid: '456' } as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      diversityReviewFlag: false,
      systemAdministratorFlag: false,
      submissionReviewFlag: false,
      dispatch: jest.fn(() => true),
    }));

    docMock2.mockReturnValue({
      document: mockPosterSubmission as PosterSubmission,
      documentError: undefined,
    });

    const wrapper = mount(<UserPoster />);
  });
  */
});
