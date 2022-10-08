/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FirestoreAction } from '../../interfaces/FirebaseInterfaces';

export interface dispatchIfNotCancelledHelper {
  action: FirestoreAction;
  isCancelled: boolean;
  dispatch: any;
}

/** dispatchIfNotCancelledHelper
 *
 * @param param0
 * @returns
 */
export function dispatchIfNotCancelledHelper({
  action,
  isCancelled,
  dispatch,
}: dispatchIfNotCancelledHelper) {
  if (!isCancelled) {
    dispatch(action);
  } else {
    return;
  }
}
