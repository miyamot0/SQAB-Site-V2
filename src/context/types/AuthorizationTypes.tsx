/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react';
import { FirebaseLoginAction } from '../interfaces/AuthorizationInterfaces';

export type AuthorizationProviderInterface = {
  children: ReactNode;
};

export type LoginDispatch = (arg: FirebaseLoginAction) => void;
