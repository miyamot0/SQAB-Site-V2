/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from 'firebase/app';

export type IndividualUserRecord = {
  userEmail: string;
  userInstitution: string;
  userName: string;
  userPhone: string;
  canPostAd: boolean;
  perms: string;
  id?: string;

  // New params
  userEducation: string;
  userGender: string;
  userAge: string;
  userRaceEthnicity: string;
  userOrientation: string;
  userLanguage: string;
  userNationality: string;
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
