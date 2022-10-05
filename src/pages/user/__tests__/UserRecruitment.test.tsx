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
import UserRecruitment from '../UserRecruitment';

Enzyme.configure({ adapter: new Adapter() });

const mockId = '123';

const mockRecruitmentAd = {
  Bio: 'string',
  Contact: 'string',
  Cycle: 'string',
  Description: 'string',
  Institution: 'string',
  Link: 'string',
  LabLink: 'string',
  Mentor: 'string',
  Name: 'string',
  Position: 'string',
  Approved: false,
  id: mockId,
};

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

describe('UserRecruitment', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => { }; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render, still loading', async () => {
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
          <UserRecruitment />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('Loading')).toBe(true)
      })
    })
  });

  it('Should render, errored out', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(false)
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: "Error"
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserRecruitment />
        </AuthorizationContextProvider>
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('you currently do not have a recruitment advertisement')).toBe(true)
      })
    })
  });


  it('Should render, good data', async () => {
    mockUserStatus.mockReturnValue({ uid: '456' } as unknown as firebase.User);
    mockReadyStatus.mockReturnValue(false)
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: mockRecruitmentAd,
      documentError: null
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserRecruitment />
        </AuthorizationContextProvider>
      );
    })
  });
});
