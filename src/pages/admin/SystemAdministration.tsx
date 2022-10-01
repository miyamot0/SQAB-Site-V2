/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { useFirebaseCollectionTyped } from '../../firebase/hooks/useFirebaseCollection';
import { SingleOptionType } from '../tools/types/GeneralTypes';
import {
  IndividualUserRecord,
  PosterSubmission,
  RecruitmentAd,
} from '../../firebase/types/RecordTypes';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { AdministrationUserSummary } from './views/AdministrationUserSummary';
import { AdminPosterDashboardLayout } from './layouts/AdminPosterDashboardLayout';
import { AdminRecruitmentDashboardLayout } from './layouts/AdminRecruitmentDashboardLayout';
import { AdminUserDashboardLayout } from './layouts/AdminUserDashboardLayout';
import { AdminDiversityDashboardLayout } from './layouts/AdminDiversityDashboardLayout';

export default function SystemAdministration(): JSX.Element {
  const { documents: recruitmentDocuments } = useFirebaseCollectionTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    queryString: undefined,
    orderString: undefined,
  });
  const { documents: userDocuments } = useFirebaseCollectionTyped<IndividualUserRecord>({
    collectionString: 'users',
    queryString: undefined,
    orderString: undefined,
  });
  const { documents: submissionDocuments } = useFirebaseCollectionTyped<PosterSubmission>({
    collectionString: 'submissions',
    queryString: undefined,
    orderString: undefined,
  });

  const [userAdArray, setUserAdArray] = useState<SingleOptionType[]>([]);
  const [selectedAdUser, setSelectedAdUser] = useState<SingleOptionType>({
    label: '',
    value: '',
  });

  const { systemAdministratorFlag } = useAuthorizationContext();

  useEffect(() => {
    if (userDocuments && recruitmentDocuments && submissionDocuments) {
      const usersWithAdsToFilter = recruitmentDocuments.map((obj) => obj.id) as string[];

      const potentialUsers = userDocuments
        .filter((obj) => !usersWithAdsToFilter.includes(obj.id as string))
        .map((obj) => {
          return {
            value: obj.id, // value for db
            label: `Name: ${obj.userName} Email: ${obj.userEmail}`,
          } as SingleOptionType;
        });

      setUserAdArray(potentialUsers);
    }
  }, [recruitmentDocuments, userDocuments, submissionDocuments]);

  return (
    <>
      {/**
       * Summary element, all admins can see general info
       */}
      <AdministrationUserSummary
        userDocuments={userDocuments}
        recruitmentDocuments={recruitmentDocuments}
        submissionDocuments={submissionDocuments}
      />

      {/**
       * Purely sysadmin content
       */}
      <AdminUserDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        userDocuments={userDocuments}
      />

      {/**
       * Diversity-focus information, for sys and admins with that priv
       */}
      <AdminDiversityDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        userDocuments={userDocuments}
      />

      {/**
       * Recruitment-focus information, for sys and admins w/ that priv
       */}
      <AdminRecruitmentDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        userDocuments={userDocuments}
        recruitmentDocuments={recruitmentDocuments}
        submissionDocuments={submissionDocuments}
        selectedAdUser={selectedAdUser}
        userAdArray={userAdArray}
        setSelectedAdUser={setSelectedAdUser}
      />

      {/**
       * Poster-focus information, for sys and admins with that priv
       */}
      <AdminPosterDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        submissionDocuments={submissionDocuments}
      />
    </>
  );
}
