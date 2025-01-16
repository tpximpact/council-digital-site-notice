/**
 * Capitalises the first letter of a string.
 * @param str - The string to capitalise.
 * @returns The string with the first letter capitalised.
 */
function capitaliseFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default capitaliseFirstLetter;
