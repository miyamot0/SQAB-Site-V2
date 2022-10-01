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
  userEducation: SingleOptionType;
  userGender: SingleOptionType;
  userAge: SingleOptionType;
  userRaceEthnicity: MultiValue<SingleOptionType>;
  userOrientation: SingleOptionType;
  userLanguage: SingleOptionType;
  userNationality: SingleOptionType;
};

export type IndividualUserRecordSaved = {
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
  userEducation: string | undefined;
  userGender: string | undefined;
  userAge: string | undefined;
  userRaceEthnicity: string | undefined;
  userOrientation: string | undefined;
  userLanguage: string | undefined;
  userNationality: string | undefined;
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

type EmailTemplate = {
  data: {
    name: string;
    title: string;
  };
  name: string;
};

export type EmailStatus = {
  delivery: {
    attempts: number;
    endTime: firebase.firestore.Timestamp;
    error: string;
    leaseExpireTime: null | string;
    startTime: firebase.firestore.Timestamp;
    state: string;
  };
  template: null | EmailTemplate;
  to: string[];
};
