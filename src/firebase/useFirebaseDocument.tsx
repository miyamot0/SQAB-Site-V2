/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Firebase document pull
 */

import { useEffect, useState } from 'react';
import { RecruitmentAd } from '../pages/recruitment/types/RecruitmentTypes';
import { projectFirestore } from './config';

const ErrorNoData = 'There was not a document at this location';
const ErrorSnapshot = 'Unable to get the document';

interface UseFirebaseDocument {
  document: RecruitmentAd | null;
  documentError: string | undefined;
}

/** useFirebaseDocument
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string} idString id for student
 * @returns {UseFirebaseDocument}
 */
export function useFirebaseDocument(
  collectionString: string,
  idString: string,
): UseFirebaseDocument {
  const [document, setDocument] = useState<any>(null);
  const [documentError, setError] = useState<string>();

  function pullDocs() {
    const ref = projectFirestore.collection(collectionString).doc(idString);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          let object = snapshot.data();

          setDocument(object);

          setError(undefined);
        } else {
          setError(ErrorNoData);
        }
      },
      (err) => {
        setError(ErrorSnapshot);
      },
    );

    return () => unsubscribe;
  }

  useEffect(() => {
    pullDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionString, idString]);

  return { document, documentError };
}
