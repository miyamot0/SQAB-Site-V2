/** isValidNumber
 *
 * Confirm that values are legit numbers
 *
 * @param {string} num number string
 * @returns {boolean} is a valid num or no
 */
export function isValidNumber(num: string): boolean {
  if (num.trim().length === 0) return false;

  if (parseFloat(num.trim()) < 0) return false;

  if (parseFloat(num.trim()) === 0) return true;

  if (parseFloat(num.trim()) === 1) return true;

  if (num.trim() === '0') return true;

  return num.trim().length > 1 && !isNaN(parseFloat(num));
}
