/**
 * Firebase object
 */
export type RecruitmentAd = {
  Bio: string;
  Contact: string;
  Cycle: string;
  Description: string;
  Institution: string;
  Link: string;
  Mentor: string;
  Name: string;
  Position: string;
  PositionText: string;
  PositionTitle: string;
  id?: string;
};

export interface EditRecruitmentState {
  userEmail: string;
  userInstitution: string;
  userName: string;
  userPhone: string;
  Bio: string;
  Cycle: string;
  Description: string;
  Institution: string;
  Link: string;
  Position: string;
}

export interface RoutedMentor {
  id: string;
}
