/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBDropdownItem } from 'mdb-react-ui-kit';

export interface NavbarDropdownLogout {
  logout: any;
}

export function NavbarDropdownLogout({ logout }: NavbarDropdownLogout) {
  return (
    <MDBDropdownItem link onClick={() => logout()}>
      Log Out
    </MDBDropdownItem>
  );
}
