import { DependencyList, useCallback, useRef } from "react";

export function useCallbackOnce<T = void>(
  callback: () => T,
  deps: DependencyList = [],
): () => T | undefined {
  const isExecuted = useRef(false);

  // Нужно реагировать только на массив deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useCallback(callback, deps);

  return useCallback(() => {
    if (!isExecuted.current) {
      isExecuted.current = true;
      return memoizedCallback();
    }
    return undefined;
  }, [memoizedCallback]);
}
