/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces';
import { handleCreateStudentSubmit } from '../SubmissionSender';

const mockAddDoc = jest.fn();

jest.mock('../../../../firebase/hooks/useFirestore', () => {
  const originalModule = jest.requireActual('../../../../firebase/hooks/useFirestore');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      updateDocument: mockAddDoc,
      response: {} as FirestoreState,
    }),
  };
});

describe('SubmissionSender', () => {
  const jsdomAlert = window.alert;
  const windowMock = jest.fn();

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = windowMock; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Success', async () => {
    const state = {
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
    const user = { uid: '123' } as firebase.User;
    const addDocument = jest.fn();
    const setButtonText = jest.fn();
    const dispatch = jest.fn();

    await handleCreateStudentSubmit({
      state,
      user,
      addDocument,
      setButtonText,
      response: {} as FirestoreState,
      dispatch,
    });

    expect(addDocument).toBeCalled();
    expect(setButtonText).toBeCalled();
  });

  it('Bad user', async () => {
    const state = {
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
    const user = { uid: '123' } as firebase.User;
    const addDocument = jest.fn();
    const setButtonText = jest.fn();
    const dispatch = jest.fn();

    await handleCreateStudentSubmit({
      state,
      user: null as unknown as firebase.User,
      addDocument,
      setButtonText,
      response: {} as FirestoreState,
      dispatch,
    });

    expect(addDocument).not.toBeCalled();
    expect(setButtonText).not.toBeCalled();
  });

  it('Short name', async () => {
    const state = {
      formError: '',
      submittingAuthor: '',
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
    const user = { uid: '123' } as firebase.User;
    const addDocument = jest.fn();
    const setButtonText = jest.fn();
    const dispatch = jest.fn();

    await handleCreateStudentSubmit({
      state,
      user,
      addDocument,
      setButtonText,
      response: {} as FirestoreState,
      dispatch,
    });

    expect(dispatch).toBeCalled();
  });

  it('Short title', async () => {
    const state = {
      formError: '',
      submittingAuthor: 'First Last',
      posterTitle: '',
      correspondingEmail: 'fake@test.com',
      posterAbstract: 'This is the abstract',
      posterAuthorsFull: 'John Doe',
      studentPresenter: true,
      authorChoice: {
        label: 'I am interested.',
        value: 'I am interested.',
      },
    };
    const user = { uid: '123' } as firebase.User;
    const addDocument = jest.fn();
    const setButtonText = jest.fn();
    const dispatch = jest.fn();

    await handleCreateStudentSubmit({
      state,
      user,
      addDocument,
      setButtonText,
      response: {} as FirestoreState,
      dispatch,
    });

    expect(dispatch).toBeCalled();
  });

  it('Abstract long', async () => {
    const state = {
      formError: '',
      submittingAuthor: 'First Last',
      posterTitle: 'This is the title',
      correspondingEmail: 'fake@test.com',
      posterAbstract: 'word '.repeat(121),
      posterAuthorsFull: 'John Doe',
      studentPresenter: true,
      authorChoice: {
        label: 'I am interested.',
        value: 'I am interested.',
      },
    };
    const user = { uid: '123' } as firebase.User;
    const addDocument = jest.fn();
    const setButtonText = jest.fn();
    const dispatch = jest.fn();

    await handleCreateStudentSubmit({
      state,
      user: user,
      addDocument,
      setButtonText,
      response: {} as FirestoreState,
      dispatch,
    });

    expect(dispatch).toBeCalled();
  });

  it('bad send', async () => {
    const state = {
      formError: '',
      submittingAuthor: 'First Last',
      posterTitle: 'This is the title',
      correspondingEmail: 'fake@test.com',
      posterAbstract: 'word '.repeat(10),
      posterAuthorsFull: 'John Doe',
      studentPresenter: true,
      authorChoice: {
        label: 'I am interested.',
        value: 'I am interested.',
      },
    };
    const user = { uid: '123' } as firebase.User;
    const addDocument = jest.fn();
    const setButtonText = jest.fn();
    const dispatch = jest.fn();

    await handleCreateStudentSubmit({
      state,
      user: user,
      addDocument,
      setButtonText,
      response: { error: 'failure' } as FirestoreState,
      dispatch,
    });

    expect(windowMock).toBeCalled();
  });
});
