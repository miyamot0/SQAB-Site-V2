import { SingleOptionType } from '../../tools/types/GeneralTypes';

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
