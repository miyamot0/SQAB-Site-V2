/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** dateToYMD
 *
 * @param {string} dateString
 * @returns
 */
export function dateToYMD(dateString: string) {
  const date = new Date(dateString);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

/** dateToMDY
 *
 * @param {string} dateString
 * @returns
 */
export function dateToMDY(dateString: string) {
  const date = new Date(dateString);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
}
