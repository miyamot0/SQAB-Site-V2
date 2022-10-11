/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import firebase from 'firebase';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import { AuthorizationContextProvider } from '../../../context/AuthorizationContext';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import UserProfile from '../UserProfile';
import { IndividualUserRecordSaved } from '../../../firebase/types/RecordTypes';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';

jest.mock('../../../firebase/config', () => {
  return {
    projectFirestore: jest.fn(),
    projectAuth: {
      onAuthStateChanged: jest.fn(),
      signOut: () => jest.fn(),
    },
    projectFunctions: jest.fn(),
    googleAuthProvider: jest.fn(),
    fbAuthProvider: jest.fn(),
  };
});

let mockUseFirebaseDocumentTyped: jest.Mock<any, any>;
let mockUseAuthContext: jest.Mock<any, any>;

// TODO: rep GOOD document mock
jest.mock('../../../firebase/hooks/useFirebaseDocument', () => {
  mockUseFirebaseDocumentTyped = jest.fn();
  return {
    useFirebaseDocumentTyped: mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: null,
    }),
  };
});

// TODO: rep GOOD auth mock
jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockUseAuthContext = jest.fn();
  return {
    useAuthorizationContext: mockUseAuthContext.mockImplementation(() => ({
      user: null,
      authIsReady: false,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    })),
  };
});

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

// TODO GOOD useFirestore
jest.mock('../../../firebase/hooks/useFirestore', () => {
  return {
    useFirestore: () => ({
      dispatchIfNotCancelled: jest.fn(),
      updateDocument: jest.fn(),
      addDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

describe('UserProfile', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render loading, not ready', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: false,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: null,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>,
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Loading')).toBe(true);
      });
    });
  });

  it('Should render error, docs bad', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: 'Error',
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>,
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Error')).toBe(true);
      });
    });
  });

  it('Should render loaded, Phone User', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
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
      } as IndividualUserRecordSaved,
      documentError: null,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>,
      );

      wrapper.update();
      wrapper.render();
    });
  });

  it('Should render loaded, Non-Phone User', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
        userEmail: 'string',
        userInstitution: 'string',
        userName: 'string',
        userPhone: undefined as unknown as string,
        canPostAd: true,
        perms: 'string',
        id: mockId,
        formError: undefined,
        phoneAuthed: false,
        didBuild: false,

        // New params
        userEducation: 'undefined',
        userGender: 'undefined',
        userAge: 'undefined',
        userRaceEthnicity: 'Caucasian/White',
        userOrientation: 'undefined',
        userLanguage: 'undefined',
        userNationality: 'undefined',
      } as IndividualUserRecordSaved,
      documentError: null,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>,
      );

      wrapper.update();
      wrapper.render();
    });
  });

  it('Should render loaded, Multi-setting user', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
        userEmail: 'string',
        userInstitution: 'string',
        userName: 'string',
        userPhone: undefined as unknown as string,
        canPostAd: true,
        perms: 'string',
        id: mockId,
        formError: undefined,
        phoneAuthed: false,
        didBuild: false,

        // New params
        userEducation: 'undefined',
        userGender: 'undefined',
        userAge: 'undefined',
        userRaceEthnicity: 'undefined:undefined',
        userOrientation: 'undefined',
        userLanguage: 'undefined',
        userNationality: 'undefined',
      } as IndividualUserRecordSaved,
      documentError: null,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>,
      );

      wrapper.update();
      wrapper.render();
    });
  });

  it('Should render loaded, Null Ethnicity', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '456' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
        userEmail: 'string',
        userInstitution: 'string',
        userName: 'string',
        userPhone: undefined as unknown as string,
        canPostAd: true,
        perms: 'string',
        id: mockId,
        formError: undefined,
        phoneAuthed: false,
        didBuild: false,

        // New params
        userEducation: 'undefined',
        userGender: 'undefined',
        userAge: 'undefined',
        userRaceEthnicity: null as unknown as string,
        userOrientation: 'undefined',
        userLanguage: 'undefined',
        userNationality: 'undefined',
      } as IndividualUserRecordSaved,
      documentError: null,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>,
      );

      wrapper.update();
      wrapper.render();
    });
  });
});
