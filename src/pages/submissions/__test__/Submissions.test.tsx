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
import Submission from '../Submission';
import selectEvent from 'react-select-event';
import { IndividualUserRecordSaved } from '../../../firebase/types/RecordTypes';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  AuthorOptions,
  SubmissionAction,
  SubmissionReducer,
} from '../functionality/SubmissionFunctionality';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

let mockUserStatus: firebase.User | null;
let mockReadyStatus: boolean;
jest.mock('../../../context/hooks/useAuthorizationContext', () => {
  mockUserStatus = { uid: '123' } as firebase.User;
  mockReadyStatus = true;

  return {
    useAuthorizationContext: () => ({
      user: mockUserStatus,
      authIsReady: mockReadyStatus,
    }),
  };
});

let mockInitialSubmissionState = {
  formError: '',
  submittingAuthor: '',
  posterTitle: '',
  correspondingEmail: '',
  posterAbstract: '',
  posterAuthorsFull: '',
  studentPresenter: true,
  authorChoice: {
    label: 'I am interested.',
    value: 'I am interested.',
  },
};

jest.mock('./../functionality/SubmissionFunctionality'),
  () => {
    return {
      AuthorOptions,
      SubmissionAction,
      SubmissionReducer,
      InitialSubmissionState: mockInitialSubmissionState,
    };
  };

let mockPortalOpen = false;
jest.mock('./../helpers/SubmissionDateHelper', () => {
  return {
    checkIfSubmissionsOpen: () => mockPortalOpen,
  };
});

let mockUseFirebaseDocumentTyped: jest.Mock<any, any>;
jest.mock('../../../firebase/hooks/useFirebaseDocument', () => {
  mockUseFirebaseDocumentTyped = jest.fn();

  return {
    ...jest.requireActual('../../../firebase/hooks/useFirebaseDocument'),
    useFirebaseDocumentTyped: mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
        userEmail: 'string@test.com',
        userInstitution: 'string university',
        userName: 'First Last',
        userPhone: 'string',
        canPostAd: true,
        perms: 'string',
        id: '123',
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
    }),
  };
});

describe('Submission', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render, but with bad user', () => {
    mockUserStatus = null;
    mockReadyStatus = false;

    const wrapper = mount(<Submission userId={'123'} />);

    expect(wrapper.html().toString().includes('currently closed')).toBe(true);
  });

  it('Should render, testing select', async () => {
    await act(async () => {
      mockUserStatus = { uid: '123' } as firebase.User;
      mockReadyStatus = true;
      mockPortalOpen = true;

      const { getByLabelText } = render(<Submission userId={'123'} />);

      await selectEvent.select(
        getByLabelText('Tony Nevin Student Presenter Award:'),
        'I am NOT interested.',
      );
      await selectEvent.select(
        getByLabelText('Tony Nevin Student Presenter Award:'),
        'I am interested.',
      );
    });
  });

  it('Should render', async () => {
    mockUserStatus = { uid: '123' } as firebase.User;
    mockReadyStatus = true;
    mockPortalOpen = true;

    await act(async () => {
      const wrapper = mount(<Submission userId={'123'} />);

      const form = wrapper.find('form');
      expect(form.length).toBe(1);
      form.simulate('submit');

      expect(wrapper.find(Submission).length).toBe(1);

      const textAreas = wrapper.find('textarea');
      expect(textAreas.length).toBe(3);

      textAreas.at(0).simulate('change');
      form.simulate('submit');

      textAreas.at(0).simulate('change', { target: { value: 'poster title string' } });
      form.simulate('submit');

      textAreas.at(1).simulate('change', { target: { value: 'poster abstract string' } });
      form.simulate('submit');
      textAreas.at(1).simulate('change', { target: { value: 'string '.repeat(121) } });
      form.simulate('submit');

      textAreas.at(2).simulate('change', { target: { value: 'poster author list' } });
      form.simulate('submit');

      const button = wrapper.find('.btn');
      expect(button.length).toBe(1);
      button.simulate('click');
    });
  });

  it('Should finish', async () => {
    mockUserStatus = { uid: '123' } as firebase.User;
    mockReadyStatus = true;
    mockPortalOpen = true;
    mockInitialSubmissionState = {
      formError: '',
      submittingAuthor: 'First Last',
      posterTitle: 'This is the title',
      correspondingEmail: 'fake@test.com',
      posterAbstract: 'This is the abstract',
      posterAuthorsFull: 'John Doe',
      studentPresenter: true,
      authorChoice: {
        label: 'I am interested.',
        value: 'I am interested.',
      },
    };

    await act(async () => {
      const wrapper = mount(<Submission userId={'123'} />);

      const form = wrapper.find('form');
      expect(form.length).toBe(1);
      form.simulate('submit');

      expect(wrapper.find(Submission).length).toBe(1);

      const textAreas = wrapper.find('textarea');
      expect(textAreas.length).toBe(3);

      const title = textAreas.at(0).getDOMNode<HTMLInputElement>();
      title.value = 'wee';
      textAreas.at(0).simulate('change');
      wrapper.update();

      const abstract = textAreas.at(1).getDOMNode<HTMLInputElement>();
      abstract.value = 'string '.repeat(121);
      textAreas.at(1).simulate('change');
      wrapper.update();

      const authorList = textAreas.at(2).getDOMNode<HTMLInputElement>();
      authorList.value = 'poster author list';
      textAreas.at(2).simulate('change');
      wrapper.update();

      wrapper.find('form').simulate('submit');
    });
  });
});
