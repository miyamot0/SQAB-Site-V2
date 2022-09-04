import firebase from 'firebase/app';
import { SingleOptionType } from '../../tools/helpers/GeneralTypes';

/**
 * Type for firebase
 */
export type PosterSubmission = {
  name: string;
  title: string;
  email: string;
  abstract: string;
  list: string;
  time: firebase.firestore.Timestamp;
  presenter: boolean;
  reviewed: boolean;
};

/**
 * Type for reducer
 */
export type PosterState = {
  formError: string;
  submittingAuthor: string;
  posterTitle: string;
  correspondingEmail: string;
  posterAbstract: string;
  posterAuthorsFull: string;
  studentPresenter: boolean;
  authorChoice: SingleOptionType;
};
