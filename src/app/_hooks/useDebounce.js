import { useEffect, useRef, useState, useCallback } from 'react';

export function useDebounce(state, ms) {
  const [debouncedState, setDebouncedState] = useState(state);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setDebouncedState(state), ms);
  }, [state, ms]);
  return debouncedState;
}

export function useDebounceCallback(fn, timeout) {
  const timeoutRef = useRef(null);
  return useCallback(
    (...args) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, timeout);
    },
    [fn, timeout],
  );
}
