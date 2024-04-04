import { useEffect } from 'react';

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, handler]);
}
