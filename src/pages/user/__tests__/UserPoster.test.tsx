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
import Enzyme, { shallow } from 'enzyme';
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

// TODO good useFirestoreReducer
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

describe('UserPoster', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render non-entry screen, since auth not ready, null docs', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '123' } as unknown as firebase.User,
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
    let wrapper: Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = shallow(
        <AuthorizationContextProvider>
          <UserPoster />
        </AuthorizationContextProvider>,
      );

      wrapper.update();
      wrapper.render();

      await waitFor(() => {
        expect(wrapper.html().toString().includes('contact the site administrator')).toBe(true);
      });
    });
  });

  it('Should render non-entry screen, docs are bad', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '123' } as unknown as firebase.User,
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
    let wrapper: Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = shallow(
        <AuthorizationContextProvider>
          <UserPoster />
        </AuthorizationContextProvider>,
      );

      await waitFor(() => {
        expect(wrapper.html().toString().includes('contact the site administrator')).toBe(true);
      });
    });
  });

  it('Should render, good auth, docs', async () => {
    mockUseAuthContext.mockImplementation(() => ({
      user: { uid: '123' } as unknown as firebase.User,
      authIsReady: true,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
      dispatch: undefined,
    }));

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
      documentError: undefined,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    await act(async () => {
      wrapper = mount(
        <AuthorizationContextProvider>
          <UserPoster />
        </AuthorizationContextProvider>,
      );

      await waitFor(() => {
        // Should not display
        expect(wrapper.html().toString().includes('Status of Review')).toBe(true);
      });
    });
  });
});
