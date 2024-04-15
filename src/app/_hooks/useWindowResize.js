import { useEffect, useState } from 'react';

const getCurrentWidthAndHeight = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export function useWindowResize() {
  const [widthAndHeight, setWidthAndHeight] = useState({
    width: undefined,
    height: undefined,
  });

  const handler = () => {
    setWidthAndHeight(getCurrentWidthAndHeight());
  };

  useEffect(() => {
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return widthAndHeight;
}
