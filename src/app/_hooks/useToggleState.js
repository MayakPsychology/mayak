import { useCallback, useState } from 'react';

export default function useToggleState(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState(currentState => !currentState), []);
  const open = useCallback(() => setState(currentState => !currentState), []);
  const close = useCallback(() => setState(currentState => !currentState), []);

  return [state, { open, close, toggle }];
}
