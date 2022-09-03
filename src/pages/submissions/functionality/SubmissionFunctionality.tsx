import { SingleOptionType } from '../../tools/helpers/GeneralTypes';
import { PosterState } from '../types/SubmissionTypes';

/**
 * Actions for reducer
 */
export enum SubmissionAction {
  Error = 'Error',
  Author = 'Author',
  Title = 'Title',
  Abstract = 'Abstract',
  AuthorsFull = 'AuthorsFull',
  Email = 'Email',
  Choice = 'Choice',
}

/**
 * Default choice for select
 */
export const AuthorOptions: SingleOptionType[] = [
  {
    label: 'I am interested.',
    value: 'I am interested.',
  },
  {
    label: 'I am NOT interested.',
    value: 'I am NOT interested.',
  },
];

/**
 * Initial state
 */
export const InitialSubmissionState: PosterState = {
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
  } as SingleOptionType,
};

/**
 * Reducer for submission
 *
 * @param {PosterState} state
 * @param {any} action
 * @returns {PosterState}
 */
export function SubmissionReducer(state: PosterState, action: any): PosterState {
  switch (action.type) {
    case SubmissionAction.Error:
      return { ...state, formError: action.payload };
    case SubmissionAction.Author:
      return { ...state, submittingAuthor: action.payload };
    case SubmissionAction.Title:
      return { ...state, posterTitle: action.payload };
    case SubmissionAction.Abstract:
      return { ...state, posterAbstract: action.payload };
    case SubmissionAction.AuthorsFull:
      return { ...state, posterAuthorsFull: action.payload };
    case SubmissionAction.Email:
      return { ...state, correspondingEmail: action.payload };
    case SubmissionAction.Choice:
      return { ...state, authorChoice: action.payload };

    default:
      throw new Error();
  }
}
