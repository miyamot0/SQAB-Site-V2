/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { PosterDashboardLayout } from './layouts/PosterDashboardLayout';
import { DiversityDashboardLayout } from './layouts/DiversityDashboardLayout';
import { RecruitmentDashboardLayout } from './layouts/RecruitmentDashboardLayout';

export default function BasicAdministrator(): JSX.Element {

  const { systemAdministratorFlag,
    diversityReviewFlag,
    studentRecruitFlag,
    submissionReviewFlag } = useAuthorizationContext();

  return (
    <>
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
