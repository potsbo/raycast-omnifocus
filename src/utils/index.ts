import { useEffect, useState } from "react";

export function useLoad<T>(loader: () => Promise<T>): T | undefined;
export function useLoad<T, S>(loader: () => Promise<T>, map: (_: T) => S): S | undefined;

export function useLoad<T>(loader: () => Promise<T>, map?: (_: T) => T) {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    (async () => {
      const raw = await loader();
      if (map) {
        setValue(map(raw));
        return;
      }
      setValue(raw);
    })();
  }, []);
  return value;
}
