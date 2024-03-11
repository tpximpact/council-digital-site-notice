export function getLocalStorage({ key, defaultValue }: any) {
  const getValue = localStorage.getItem(key);

  let storagedValue = defaultValue;

  if (getValue && getValue !== "undefined") {
    storagedValue = JSON.parse(getValue);
  }

  return storagedValue;
}
//fazer test
