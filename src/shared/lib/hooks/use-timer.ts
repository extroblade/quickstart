import { useCallback, useEffect, useRef } from "react";

export const useTimer = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentCallbackRef = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    currentCallbackRef.current = null;
  }, []);

  const start = useCallback(
    (callback: () => void, timeout: number) => {
      stop();
      currentCallbackRef.current = callback;
      timerRef.current = setTimeout(() => {
        const cb = currentCallbackRef.current;
        stop();
        cb?.();
      }, timeout);
    },
    [stop],
  );

  const restart = useCallback(
    (callback: () => void, timeout: number) => {
      start(callback, timeout);
    },
    [start],
  );

  useEffect(() => {
    return stop;
  }, [stop]);

  const isActive = timerRef.current !== null;

  return { start, stop, restart, isActive };
};
