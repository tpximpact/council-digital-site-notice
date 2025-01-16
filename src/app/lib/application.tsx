export const questions: { [key: number]: string } = {
  3: "Design, size or height of new buildings or extensions",
  4: "Use and function of the proposed development",
  5: "Impacts on natural light",
  6: "Privacy of neighbours",
  7: "Access",
  8: "Noise from new uses",
  9: "Traffic, parking or road safety",
  10: "Other",
};

export const phoneRegex =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
export const postCodeRegex =
  /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

export function getLocalStorage({ key, defaultValue }: any) {
  const getValue = localStorage.getItem(key);

  let storagedValue = defaultValue;

  if (getValue && getValue !== "undefined") {
    storagedValue = JSON.parse(getValue);
  }

  return storagedValue;
}
