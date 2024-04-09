import { useCallback, useEffect } from 'react';

export function useKeyPress(key, handler) {
  const onKeyPress = useCallback(
    e => {
      if (key === e.key) {
        handler();
      }
    },
    [key, handler],
  );
  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [onKeyPress]);
}
