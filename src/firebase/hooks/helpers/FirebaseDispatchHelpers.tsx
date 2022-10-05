/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreAction } from '../../interfaces/FirebaseInterfaces';

/** dispatchIfNotCancelledHelper
 *
 * @param param0
 * @returns
 */
export function dispatchIfNotCancelledHelper({
  action,
  isCancelled,
  dispatch,
}: {
  action: FirestoreAction;
  isCancelled: boolean;
  dispatch: any;
}) {
  if (!isCancelled) {
    dispatch(action);
  } else {
    return;
  }
}
