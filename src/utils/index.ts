import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@raycast/api";

const cachePrefix = "v1";

export function useLoad<T>(loader: () => Promise<T>, key: string) {
  const cacheKey = `${cachePrefix}:${key}`;
  const [value, setValue] = useState<{ value: T | undefined; isLoading: true } | { value: T; isLoading: false }>({
    value: undefined,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const str = await getLocalStorageItem<string>(cacheKey);
      if (str === undefined) {
        return;
      }
      // TODO: type check
      const obj = JSON.parse(str);
      setValue((current) => {
        if (!current.isLoading) {
          return current;
        }
        return { value: obj, isLoading: current.isLoading };
      });
    })();

    (async () => {
      await getLocalStorageItem<string>(cacheKey);
      const raw = await loader();
      setValue({ value: raw, isLoading: false });
      setLocalStorageItem(cacheKey, JSON.stringify(raw));
    })();
  }, []);
  return value;
}

export const onlyAvailable = <T extends { completed: boolean }>(t: () => Promise<T[]>) => {
  return () => t().then((t) => t.filter((t) => !t.completed));
};
export const onlyFlagged = <T extends { flagged: boolean }>(t: () => Promise<T[]>) => {
  return () => t().then((t) => t.filter((t) => t.flagged));
};
