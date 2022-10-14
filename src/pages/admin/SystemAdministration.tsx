/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection';
import { IndividualUserRecordSaved, PosterSubmission } from '../../firebase/types/RecordTypes';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { AdministrationUserSummary } from './views/AdministrationUserSummary';
import { PosterDashboardLayout } from './layouts/PosterDashboardLayout';
import { UserDashboardLayout } from './layouts/UserDashboardLayout';
import { AdminEmailDashboardLayout } from './layouts/AdminEmailDashboardLayout';
import { DiversityDashboardLayout } from './layouts/DiversityDashboardLayout';
import { RecruitmentDashboardLayout } from './layouts/RecruitmentDashboardLayout';

export default function SystemAdministration(): JSX.Element {
  const { documents: userDocuments } = useFirebaseCollectionTyped<IndividualUserRecordSaved>({
    collectionString: 'users',
    queryString: undefined,
    orderString: undefined,
  });
  const { documents: submissionDocuments } = useFirebaseCollectionTyped<PosterSubmission>({
    collectionString: 'submissions',
    queryString: undefined,
    orderString: undefined,
  });

  const { systemAdministratorFlag, diversityReviewFlag, studentRecruitFlag, submissionReviewFlag } =
    useAuthorizationContext();

  return (
    <>
      {/**
       * Summary element, all admins can see general info
       */}
      <AdministrationUserSummary
        userDocuments={userDocuments}
        submissionDocuments={submissionDocuments}
      />

      {/**
       * Purely sysadmin content
       */}
      <AdminEmailDashboardLayout sysAdminFlag={systemAdministratorFlag} />

      {/**
       * Purely sysadmin content
       */}
      <UserDashboardLayout sysAdminFlag={systemAdministratorFlag} userDocuments={userDocuments} />

      {/**
       * Diversity-focus information, for sys and admins with that priv
       */}
      <DiversityDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        diversityReviewFlag={diversityReviewFlag}
      />

      {/**
       * Recruitment-focus information, for sys and admins w/ that priv
       */}
      <RecruitmentDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        recruitmentReviewFlag={studentRecruitFlag}
      />

      {/**
       * Poster-focus information, for sys and admins with that priv
       */}
      <PosterDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        submissionReviewFlag={submissionReviewFlag}
      />
    </>
  );
}
