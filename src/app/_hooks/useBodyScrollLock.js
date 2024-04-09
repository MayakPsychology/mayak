import { useEffect } from 'react';

export function useBodyScrollLock(locked) {
  // const axes = useMemo(
  //   () => ({
  //     x: 'overflow-x-hidden',
  //     y: 'overflow-y-hidden',
  //     xy: 'overflow-hidden',
  //   }),
  //   [],
  // );
  // if (axes[axis] === undefined) {
  //   throw Error('Invalid axis parameter must be x, y or xy');
  // }

  useEffect(() => {
    const clear = () => {
      document.body.classList.remove('overflow-scroll');
      document.documentElement.classList.remove('overflow-hidden');
    };

    if (locked) {
      document.body.classList.add('overflow-scroll');
      document.documentElement.classList.add('overflow-hidden');
    } else {
      clear();
    }

    return clear;
  }, [locked]);
}
