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
import { AdminRecruitmentDashboardLayout } from './layouts/AdminRecruitmentDashboardLayout';
import { AdminDashboardSystemLayout } from './layouts/AdminDashboardSystemLayout';
import { AdminPosterDashboardLayout } from './layouts/AdminPosterDashboardLayout';

export default function Administration(): JSX.Element {
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

  const { sysAdminFlag } = useAuthorizationContext();

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
      <AdministrationUserSummary
        userDocuments={userDocuments}
        recruitmentDocuments={recruitmentDocuments}
        submissionDocuments={submissionDocuments}
      />

      <AdminDashboardSystemLayout
        sysAdminFlag={sysAdminFlag}
        userDocuments={userDocuments}
        recruitmentDocuments={recruitmentDocuments}
        submissionDocuments={submissionDocuments}
        selectedAdUser={selectedAdUser}
        userAdArray={userAdArray}
        setSelectedAdUser={setSelectedAdUser}
      />

      <AdminRecruitmentDashboardLayout recruitmentDocuments={recruitmentDocuments} />

      <AdminPosterDashboardLayout submissionDocuments={submissionDocuments} />
    </>
  );
}
