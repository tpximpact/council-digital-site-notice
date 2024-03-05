export function healpLocalStorage({ key, defaultValue }: any) {
  const getValue = localStorage.getItem(key);
  let storagedValue = defaultValue;
  if (getValue !== null && getValue !== undefined) {
    storagedValue = JSON.parse(getValue);
  }

  return storagedValue;
}
