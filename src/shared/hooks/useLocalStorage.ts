import { useCallback, useState } from "react";

export function useLocalStorage(key: string) {
  const getDataFromLS = useCallback(() => {
    return localStorage.getItem(key) ?? "";
  }, [key]);

  const [value, setValue] = useState(() => getDataFromLS());

  const setDataQueryToLS = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      setValue(value);
    },
    [key],
  );

  return {
    valueFromLS: value,
    setValueToLS: setDataQueryToLS,
  };
}
