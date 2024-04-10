import { useCallback, useEffect } from 'react';

export function useKeyEvent({ key, handler, event = 'keypress' }) {
  const callback = useCallback(
    e => {
      if (typeof key === 'function' ? key(event) : key === e.key) {
        handler();
      }
    },
    [key, event, handler],
  );
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => {
      window.removeEventListener(event, callback);
    };
  }, [callback, event]);
}
