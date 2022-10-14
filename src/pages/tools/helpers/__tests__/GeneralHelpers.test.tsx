/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isValidNumber } from '../GeneralHelpers';

describe('isValidNumber', () => {
  it('Should pass through various checks', () => {
    expect(isValidNumber(undefined as unknown as string)).toBe(false);
    expect(isValidNumber(' ')).toBe(false);
    expect(isValidNumber('')).toBe(false);
    expect(isValidNumber('-1')).toBe(false);
    expect(isValidNumber('0')).toBe(true);
    expect(isValidNumber('1')).toBe(true);
    expect(isValidNumber('abc')).toBe(false);
  });
});
