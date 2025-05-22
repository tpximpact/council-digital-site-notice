/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string - The string to be capitalized.
 * @returns {string} - The string with the first letter capitalized.
 *
 * @example
 * // Returns "Hello"
 * capitalizeFirstLetter("hello");
 *
 * @example
 * // Returns "Hello world"
 * capitalizeFirstLetter("hello world");
 *
 * @example
 * // Returns "123abc"
 * capitalizeFirstLetter("123abc");
 */
export const capitaliseFirstLetter = (string: string) => {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  );
};
