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
import UserPoster from '../UserPoster';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';
import { mount } from 'enzyme';
import { timestamp } from '../../../firebase/config';
import { PosterSubmission } from '../../../firebase/types/RecordTypes';
import { AuthorizationContextProvider } from '../../../context/AuthorizationContext';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

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

const mockId = '123';

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

describe('UserPoster', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => { }; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render non-entry screen, since auth not ready, null docs', async () => {
    mockUserStatus.mockReturnValue({ uid: '123' } as unknown as firebase.User);
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
          <UserPoster />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('you currently do not have a poster on record as being submitted')).toBe(true)
      })
    })
  });

  it('Should render non-entry screen, docs are bad', async () => {
    mockUserStatus.mockReturnValue({ uid: '123' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {

      wrapper = mount(
        <AuthorizationContextProvider>
          <UserPoster />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('you currently do not have a poster on record as being submitted')).toBe(true)
      })
    })
  });

  it('Should render, good auth, docs', async () => {
    mockUserStatus.mockReturnValue({ uid: '123' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(true)

    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
        name: '',
        title: '',
        email: '',
        abstract: '',
        list: '',
        time: timestamp.fromDate(new Date()),
        presenter: true,
        reviewed: false,
        id: '',
      } as PosterSubmission,
      documentError: undefined
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserPoster />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        // Should not display
        expect(wrapper.html().toString().includes("Status of Review")).toBe(true);
      })
    })
  });
});
