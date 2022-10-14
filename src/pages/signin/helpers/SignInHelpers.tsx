/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProviderTypes } from '../../../firebase/types/AccountTypes';

/** postOTPEntryCall
 *
 * Call to auth obj to challenge codes
 *
 */
export async function postOTPEntryCall(
  login: any,
  confirmResult: any,
  otpNumber: string,
  setShowModal: any,
) {
  try {
    await login(ProviderTypes.Phone, confirmResult, otpNumber);

    setShowModal(false);
  } catch (err) {
    alert(err);
  }
}
