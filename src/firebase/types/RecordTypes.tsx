/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase/app';
import { MultiValue } from 'react-select';
import { SingleOptionType } from '../../pages/tools/types/GeneralTypes';

export type IndividualUserRecord = {
  userEmail: string;
  userInstitution: string;
  userName: string;
  userPhone: string;
  canPostAd: boolean;
  perms: string;
  id?: string;
  formError: string | undefined | null;
  phoneAuthed: boolean;
  didBuild: boolean;

  // New params
  userEducation: SingleOptionType | undefined;
  userGender: SingleOptionType | undefined;
  userAge: SingleOptionType | undefined;
  userRaceEthnicity: MultiValue<SingleOptionType> | undefined;
  userOrientation: SingleOptionType | undefined;
  userLanguage: SingleOptionType | undefined;
  userNationality: SingleOptionType | undefined;
};

export type PosterSubmission = {
  name: string;
  title: string;
  email: string;
  abstract: string;
  list: string;
  time: firebase.firestore.Timestamp;
  presenter: boolean;
  reviewed: boolean;
  id?: string;
};

export type RecruitmentAd = {
  Bio: string;
  Contact: string;
  Cycle: string;
  Description: string;
  Institution: string;
  Link: string;
  LabLink: string;
  Mentor: string;
  Name: string;
  Position: string;
  Approved: boolean;
  id?: string;
};
