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

const CollectionError = 'Unable to retrieve data';

/** useFirebaseCollection
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @returns {UseFirebaseCollection}
 */
export function useFirebaseCollectionTyped<T>(collectionString: string): {
  documents: T[] | null;
  error: string | undefined;
} {
  const [documents, setDocuments] = useState<T[] | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let ref: Query = projectFirestore.collection(collectionString);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            } as unknown as T;
          }),
        );

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
