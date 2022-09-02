export function unIHS(x: number): number {
  return (1 / Math.pow(10, 1 * x)) * (Math.pow(10, 2 * x) - 1);
}

export function ihsTransform(x: number): number {
  return Math.log(0.5 * x + Math.sqrt(Math.pow(0.5, 2) * Math.pow(x, 2) + 1)) / Math.log(10);
}

/** renderExponentialDemand
 *
 * Project demand at instance
 *
 * @param {number} Q q0
 * @param {number} A a
 * @param {number} K k
 * @param {number} x pmax
 * @returns {number} projected level of demand
 */
export function renderExponentialDemand(Q: number, A: number, K: number, x: number): number {
  return Math.log(Q) / Math.log(10) + K * (Math.exp(-A * Q * x) - 1);
}

/** renderExponentiatedDemand
 *
 * Project demand at instance
 *
 * @param {number} Q q0
 * @param {number} A a
 * @param {number} K k
 * @param {number} x pmax
 * @returns {number} projected level of demand
 */
export function renderExponentiatedDemand(Q: number, A: number, K: number, x: number): number {
  return Q * Math.pow(10, K * (Math.exp(-A * Q * x) - 1));
}

/** renderIHS3Demand
 *
 * Project demand at instance
 *
 * @param {number} Q q0
 * @param {number} A a
 * @param {number} K k
 * @param {number} x pmax
 * @returns {number} projected level of demand
 */
export function renderIHS3Demand(Q: number, A: number, K: number, x: number): number {
  return ihsTransform(Q) + K * (Math.exp(-A * Q * x) - 1);
}

/** renderIHS3Demand
 *
 * Project demand at instance
 *
 * @param {number} Q q0
 * @param {number} A a
 * @param {number} x pmax
 * @returns {number} projected level of demand
 */
export function renderIHS2Demand(Q: number, A: number, x: number): number {
  return ihsTransform(Q) * Math.exp(-(A / ihsTransform(Q)) * Q * x);
}
