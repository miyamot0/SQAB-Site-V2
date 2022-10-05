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

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';

let mockUseFirebaseDocumentTyped: jest.Mock<any, any>;
let mockUserStatus: jest.Mock<any, any>;
let mockReadyStatus: jest.Mock<any, any>;

jest.mock('../../../firebase/hooks/useFirebaseDocument', () => {
  mockUseFirebaseDocumentTyped = jest.fn();

  return {
    ...jest.requireActual("../../../firebase/hooks/useFirebaseDocument"),
    useFirebaseDocumentTyped: mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: null
    })
  }
})

jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockUserStatus = jest.fn();
  mockReadyStatus = jest.fn();

  return {
    ...jest.requireActual('../../../context/hooks/useAuthorizationContext'),
    user: mockUserStatus.mockReturnValue(undefined),
    authIsReady: mockReadyStatus.mockReturnValue(false)
  }
})

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

*/

describe('UserProfile', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => { }; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render loading, not ready', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(false)
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes("Loading")).toBe(true)
      })
    })
  });

  it('Should render error, docs bad', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: "Error"
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes("Error")).toBe(true)
      })
    })
  });

  it('Should render loaded, Phone User', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)
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
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>
      );

      wrapper.update();
      wrapper.render();
    })
  });

  it('Should render loaded, Non-Phone User', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)
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
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>
      );

      wrapper.update();
      wrapper.render();
    })
  });

  it('Should render loaded, Multi-setting user', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)
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
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>
      );

      wrapper.update();
      wrapper.render();
    })
  });

  it('Should render loaded, Null Ethnicity', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)
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
        userRaceEthnicity: undefined as unknown as string,
        userOrientation: 'undefined',
        userLanguage: 'undefined',
        userNationality: 'undefined',
      } as IndividualUserRecordSaved,
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserProfile />
        </AuthorizationContextProvider>
      );

      wrapper.update();
      wrapper.render();
    })
  });
});
