/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCardTitle } from 'mdb-react-ui-kit';
import { OutputUserErrorInterface } from '../interfaces/UserInterfaces';

/** OutputUserError
 *
 * @param param0
 * @returns
 */
export function OutputUserError({ documentError }: OutputUserErrorInterface): JSX.Element {
  return documentError ? (
    <>
      <MDBCardTitle className='error'>{documentError}</MDBCardTitle>
    </>
  ) : (
    <br />
  );
}
