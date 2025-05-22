export function getSessionStorage({ key, defaultValue }: any) {
  const getValue = sessionStorage.getItem(key);

  let storagedValue = defaultValue;

  if (getValue && getValue !== "undefined") {
    storagedValue = JSON.parse(getValue);
  }

  return storagedValue;
}
