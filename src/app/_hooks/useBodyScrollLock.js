import { useEffect } from 'react';

const axes = {
  x: 'overflow-x-hidden',
  y: 'overflow-y-hidden',
  xy: 'overflow-hidden',
};
const OVERFLOW_SCROLL = 'overflow-scroll';

export function useBodyScrollLock(locked, axis = 'xy') {
  if (axes[axis] === undefined) {
    throw Error('Invalid axis parameter must be x, y or xy');
  }
  
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
  }, [locked, axis]);
}
