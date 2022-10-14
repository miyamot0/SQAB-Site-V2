/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { generateOutputScore, generateSlope } from '../DemandHelpers';

describe('generateSlope', () => {
  it('value check', () => {
    const qd = 1.0001;
    const pd = 1.0001;

    const result = generateSlope(qd, pd);
  });
});

describe('generateOutputScore', () => {
  it('value check', () => {
    const qd = 1.0001;
    const pd = 1.0001;

    const result = generateOutputScore(qd, pd);
  });
});
