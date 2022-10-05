/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import UserProfile from './../UserProfile';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import * as UseAuthProvider from '../../../context/hooks/useAuthorizationContext';

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';

const mockIndividualUserRecordSaved = {
  userEmail: 'string',
  userInstitution: 'string',
  userName: 'string',
  userPhone: 'string',
  canPostAd: true,
  perms: 'string',
  id: mockId,
  formError: undefined,
  phoneAuthed: false,
  didBuild: false,

  // New params
  userEducation: undefined,
  userGender: undefined,
  userAge: undefined,
  userRaceEthnicity: undefined,
  userOrientation: undefined,
  userLanguage: undefined,
  userNationality: undefined,
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

jest.mock('../../../firebase/hooks/useFirebaseDocument', () => {
  const originalModule = jest.requireActual('../../../firebase/hooks/useFirebaseDocument');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      useFirebaseDocumentTyped: {
        document: mockIndividualUserRecordSaved,
        documentError: undefined,
      },
    }),
  };
});

describe('UserProfile', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render', () => {
    const docMock = jest.spyOn(UseAuthProvider, 'useAuthorizationContext');
    docMock.mockImplementationOnce(() => ({
      user: { uid: '456' } as firebase.User,
      adminFlag: false,
      authIsReady: true,
      studentRecruitFlag: false,
      diversityReviewFlag: false,
      systemAdministratorFlag: false,
      submissionReviewFlag: false,
      dispatch: jest.fn(() => true),
    }));

    const wrapper = mount(<UserProfile />);
  });
});
