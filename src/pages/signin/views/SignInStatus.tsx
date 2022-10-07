/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import firebase from "firebase";
import React from "react";

export interface SignInStatus {
    user: firebase.User | null;
    authIsReady: boolean;
}

export function SignInStatus({ user, authIsReady }: SignInStatus) {
    if (user && authIsReady) {
        return <>Authenticated</>;
    } else {
        return <>Not authenticated</>;
    }
}