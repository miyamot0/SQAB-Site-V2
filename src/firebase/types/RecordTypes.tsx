import firebase from 'firebase/app';

export interface IndividualUserRecord {
  userEmail: string;
  userInstitution: string;
  userName: string;
  userPhone: string;
  canPostAd: boolean;
  perms: string;
  id?: string;
}

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
  PositionText: string;
  PositionTitle: string;
  Approved: boolean;
  id?: string;
};
