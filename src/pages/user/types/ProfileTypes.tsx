import { RecruitmentEditAction } from '../functionality/UserFunctionality';

export interface IndividualUserRecord {
  userEmail: string;
  userInstitution: string;
  userName: string;
  userPhone: string;
  id?: string;
}

export interface RoutedAdminSet {
  id?: string;
}

export type RecruitmentActions =
  | { type: RecruitmentEditAction.LoadUser; payload: any }
  | { type: RecruitmentEditAction.LoadRecruitment; payload: any }
  | { type: RecruitmentEditAction.EditPosition; payload: string }
  | { type: RecruitmentEditAction.EditMentorBio; payload: string }
  | { type: RecruitmentEditAction.EditDescription; payload: string }
  | { type: RecruitmentEditAction.EditLink; payload: string }
  | { type: RecruitmentEditAction.EditDate; payload: string };
