/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { projectFirestore } from '../config';
import { DocumentInputInterface } from '../interfaces/FirebaseInterfaces';
import {
  onSnapshotEventDocument,
  onSnapshotEventDocumentErr,
} from './helpers/FirestoreSnapshotHelpers';

/** useFirebaseDocument
 *
 * Access a collection
 *
 * @param {string} collectionString collection address
 * @param {string} idString id for student
 * @returns {UseFirebaseDocument}
 */
export function useFirebaseDocumentTyped<T>({
  collectionString,
  idString,
}: DocumentInputInterface): {
  document: T | null;
  documentError: string | undefined;
} {
  const [document, setDocument] = useState<T | null>(null);
  const [documentError, setError] = useState<string>();

  useEffect(() => {
    const ref = projectFirestore.collection(collectionString).doc(idString);

    const unsubscribe = ref.onSnapshot(
      snapshot => onSnapshotEventDocument(snapshot, setDocument, setError),
      err => onSnapshotEventDocumentErr(err, setError),
    );

    return () => unsubscribe();
  }, [collectionString, idString]);

  return { document, documentError };
}
