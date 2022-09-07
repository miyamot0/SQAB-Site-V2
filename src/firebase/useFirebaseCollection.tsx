/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Firebase collection
 */

import { useEffect, useState } from 'react';
import { projectFirestore } from './config';

import { Query } from '@firebase/firestore-types';
import { RecruitmentAd } from './types/RecordTypes';

const CollectionError = 'Unable to retrieve data';

export type CurrentObjectTypes = RecruitmentAd;
export type CurrentObjectTypeArrays = RecruitmentAd[];

interface UseFirebaseCollection {
  documents: CurrentObjectTypeArrays | null;
  error: string | undefined;
}

/** useFirebaseCollection
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @returns {UseFirebaseCollection}
 */
export function useFirebaseCollection(collectionString: string): UseFirebaseCollection {
  const [documents, setDocuments] = useState<CurrentObjectTypeArrays | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let ref: Query = projectFirestore.collection(collectionString);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = Array<CurrentObjectTypes | null>();

        snapshot.docs.forEach((doc) => {
          let preDoc = doc.data() as CurrentObjectTypes;
          preDoc.id = doc.id;
          results.push(preDoc);
        });

        setDocuments(results as RecruitmentAd[]);
        setError(undefined);
      },
      (error) => {
        setError(CollectionError);
      },
    );

    return () => unsubscribe();
  }, [collectionString]);

  return { documents, error };
}
