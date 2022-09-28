/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IndividualUserRecord } from "../../../firebase/types/RecordTypes";
import { ProfileActions } from "../types/ProfileActionTypes";

export interface LayoutProfileBodyInterface {
    state: IndividualUserRecord;
    submitCallback: () => Promise<void>;
    dispatch: (value: ProfileActions) => void;
}

export interface OutputUserErrorInterface {
    documentError: string | undefined | null;
}