/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** isValidNumber
 *
 * Confirm that values are legit numbers
 *
 * @param {string} num number string
 * @returns {boolean} is a valid num or no
 */
export function isValidNumber(num: string): boolean {
  if (!num) return false;

  if (num && num.trim().length === 0) return false;

  if (parseFloat(num.trim()) < 0) return false;

  if (parseFloat(num.trim()) === 0) return true;

  if (parseFloat(num.trim()) === 1) return true;

  return num.trim().length > 1 && !isNaN(parseFloat(num));
}

export function round(num: number, precision: number) {
  return Number(
    Math.floor(parseFloat(num.toString() + 'e+' + precision.toString())) + 'e-' + precision,
  );
}
