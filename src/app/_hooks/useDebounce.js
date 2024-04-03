import { useEffect, useRef, useState } from 'react';

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
