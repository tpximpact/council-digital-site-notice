/**
 * utility function to convert a string to a slug
 *
 * @param text
 * @returns
 */
export const slugify = (text: string) => {
  text = text.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  text = text.toLowerCase(); // convert string to lowercase
  text = text
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return text;
};
