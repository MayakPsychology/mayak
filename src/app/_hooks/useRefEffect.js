import { useEffect, useRef } from "react";

export function useRefEffect(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}