/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase';
import { FirestoreState } from '../../../firebase/interfaces/FirebaseInterfaces';
import { PosterSubmission } from '../../../firebase/types/RecordTypes';
import { SubmissionAction } from '../functionality/SubmissionFunctionality';
import { PosterState } from '../types/SubmissionTypes';

export interface handleCreateStudentSubmit {
  state: PosterState;
  user: firebase.User | null;
  addDocument: any;
  setButtonText: any;
  response: FirestoreState;
  dispatch: any;
}

/** handleCreateStudentSubmit
 *
 * @param {HTMLFormElement} e
 */
export async function handleCreateStudentSubmit({
  state,
  user,
  addDocument,
  setButtonText,
  response,
  dispatch,
}: handleCreateStudentSubmit): Promise<void> {
  if (user === null) {
    return;
  }

  if (
    state.submittingAuthor.trim().length === 0 ||
    state.submittingAuthor.split(/\w\w+/).length < 2
  ) {
    dispatch({
      type: SubmissionAction.Error,
      payload: 'Please enter a full name (i.e., First and Last)',
    });
    return;
  } else if (state.posterTitle.trim().length === 0 || state.posterTitle.split(/\w\w+/).length < 2) {
    dispatch({
      type: SubmissionAction.Error,
      payload: 'Please enter a full title (i.e., 3+ Words)',
    });
  } else if (
    state.posterAbstract.trim().length === 0 ||
    state.posterAbstract.split(/\w\w+/).length > 120
  ) {
    dispatch({
      type: SubmissionAction.Error,
      payload: 'Check abstract length (e.g., over 120 words)',
    });
    return;
  }

  const posterSubmission: PosterSubmission = {
    name: state.submittingAuthor,
    title: state.posterTitle,
    email: state.correspondingEmail,
    abstract: state.posterAbstract,
    list: state.posterAuthorsFull,
    time: firebase.firestore.Timestamp.fromDate(new Date()),
    presenter: state.authorChoice.value === 'I am interested.',
    reviewed: false,
  };

  await addDocument(posterSubmission, user.uid);

  if (response.error) {
    alert(`There was an issue uploading your submission: ${response.error}`);
  } else {
    setButtonText('Submission Completed');
  }
}
