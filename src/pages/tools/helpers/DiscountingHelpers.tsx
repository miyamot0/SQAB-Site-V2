import { DiscountingFit } from '../types/DiscountingTypes';

/** getElementByModel
 *
 * @param {DiscountingFit[]} arr array of fits
 * @param {string} value model name to match
 * @returns {DiscountingFit | null}
 */
export function getElementByModel(arr: DiscountingFit[], value: string): DiscountingFit | null {
  const result = arr.filter(function (o) {
    return o.Model === value;
  });

  return result ? result[0] : null;
}

/** getExponentialProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getExponentialProjection(x: number, k: number[]): number {
  return Math.exp(-k[0] * x);
}

/** getHyperbolicProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getHyperbolicProjection(x: number, k: number[]): number {
  return Math.pow(1 + k[0] * x, -1);
}

/** getQuasiHyperbolicProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getQuasiHyperbolicProjection(x: number, k: number[]): number {
  return k[0] * Math.pow(k[1], x);
}

/** getMyersonProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getMyersonProjection(x: number, k: number[]): number {
  return Math.pow(1 + k[0] * x, -k[1]);
}

/** getRachlinProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getRachlinProjection(x: number, k: number[]): number {
  return Math.pow(1 + k[0] * Math.pow(x, k[1]), -1);
}

/** getRodriguezLogueProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getRodriguezLogueProjection(x: number, k: number[]): number {
  return Math.pow(1 + x * k[0], -k[1] / k[0]);
}

/** getEbertPrelecProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getEbertPrelecProjection(x: number, k: number[]): number {
  return Math.exp(-Math.pow(k[0] * x, k[1]));
}

/** getbleichrodtProjection
 *
 * @param {number} x delay value
 * @param {number[]} k param array
 * @returns {number}
 */
export function getbleichrodtProjection(x: number, k: number[]): number {
  return k[2] * Math.exp(-k[0] * Math.pow(x, k[1]));
}
