import { useEffect, useMemo } from 'react';

export function useBodyScrollLock(locked, axis = 'xy') {
  const axes = useMemo(
    () => ({
      x: 'overflow-x-hidden',
      y: 'overflow-y-hidden',
      xy: 'overflow-hidden',
    }),
    [],
  );

  if (axes[axis] === undefined) {
    throw Error('Invalid axis parameter must be x, y or xy');
  }

  const OVERFLOW_SCROLL = 'overflow-scroll';

  useEffect(() => {
    const clear = () => {
      document.body.classList.remove(OVERFLOW_SCROLL);
      document.documentElement.classList.remove(axes[axis]);
    };

    if (locked) {
      document.body.classList.add(OVERFLOW_SCROLL);
      document.documentElement.classList.add(axes[axis]);
    } else {
      clear();
    }

    return clear;
  }, [locked, axes, axis]);
}
