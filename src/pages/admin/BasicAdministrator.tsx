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
import { PosterSubmission, RecruitmentAd } from '../../firebase/types/RecordTypes';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { AdminPosterDashboardLayout } from './layouts/AdminPosterDashboardLayout';
import { useFirebaseFunction } from '../../firebase/hooks/useFirebaseFunction';
import { DiversityFunctionResponse } from '../../firebase/types/FunctionTypes';
import { DiversityDashboardLayout } from './layouts/DiversityDashboardLayout';

const { getAggregatedDiversityInformation } = useFirebaseFunction();

export default function BasicAdministrator(): JSX.Element {
  const { documents: recruitmentDocuments } = useFirebaseCollectionTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    queryString: undefined,
    orderString: undefined,
  });
  const { documents: submissionDocuments } = useFirebaseCollectionTyped<PosterSubmission>({
    collectionString: 'submissions',
    queryString: undefined,
    orderString: undefined,
  });

  const [currentDemographics, setCurrentDemographics] = useState<DiversityFunctionResponse>();

  const [userAdArray, setUserAdArray] = useState<SingleOptionType[]>([]);
  const [selectedAdUser, setSelectedAdUser] = useState<SingleOptionType>({
    label: '',
    value: '',
  });

  const { systemAdministratorFlag, diversityReviewFlag, studentRecruitFlag, submissionReviewFlag } =
    useAuthorizationContext();

  useEffect(() => {
    getAggregatedDiversityInformation().then((value) => {
      if (value && value.data) {
        const cast = value.data as DiversityFunctionResponse;

        if (cast) {
          setCurrentDemographics(cast);
        }
      }
    });
  }, [recruitmentDocuments, submissionDocuments]);

  return (
    <>
      {/**
       * Diversity-focus information, for sys and admins with that priv
       */}
      <DiversityDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        diversityReviewFlag={diversityReviewFlag}
        currentDemographics={currentDemographics}
      />
      {/**
       * Recruitment-focus information, for sys and admins w/ that priv
      <AdminRecruitmentDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        recruitmentReviewFlag={studentRecruitFlag}
        userDocuments={userDocuments}
        recruitmentDocuments={recruitmentDocuments}
        submissionDocuments={submissionDocuments}
        selectedAdUser={selectedAdUser}
        userAdArray={userAdArray}
        setSelectedAdUser={setSelectedAdUser}
      />
       */}

      {/**
       * Poster-focus information, for sys and admins with that priv
       */}
      <AdminPosterDashboardLayout
        sysAdminFlag={systemAdministratorFlag}
        submissionReviewFlag={submissionReviewFlag}
        submissionDocuments={submissionDocuments}
      />
    </>
  );
}
