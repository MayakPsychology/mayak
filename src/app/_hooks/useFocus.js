import { useEffect, useState } from 'react';

export function useFocus(ref) {
  const [state, setState] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const onFocus = () => setState(true);
    const onBlur = () => setState(false);
    node.addEventListener('focus', onFocus);
    node.addEventListener('blur', onBlur);

    return () => {
      node.removeEventListener('focus', onFocus);
      node.removeEventListener('blur', onBlur);
    };
  }, [ref]);

  return state;
}
