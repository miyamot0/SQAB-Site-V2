/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AuthorizationContextProvider } from '../../AuthorizationContext';

describe('Authorization Context', () => {
  it('...', () => {
    const val = (
      <AuthorizationContextProvider>
        <></>
      </AuthorizationContextProvider>
    );

    expect(val).not.toBe(null);
  });
});
