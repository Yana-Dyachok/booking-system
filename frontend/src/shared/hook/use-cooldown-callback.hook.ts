import { useRef, useEffect, useCallback } from 'react';

export function useCooldownCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number,
): (...args: Args) => Return | void {
  const callbackRef = useRef(callback);
  const cooldownRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledFn = useCallback(
    (...args: Args): Return | void => {
      if (cooldownRef.current) return;

      const result = callbackRef.current(...args);
      cooldownRef.current = true;

      setTimeout(() => {
        cooldownRef.current = false;
      }, delay);

      return result;
    },
    [delay],
  );

  return throttledFn;
}
