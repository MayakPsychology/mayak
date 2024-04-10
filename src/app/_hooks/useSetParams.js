import { useRouter, useSearchParams } from 'next/navigation';

export function useSetParam(param) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams);
  const add = value => {
    newParams.append(param, value);
    router.replace(`?${newParams.toString()}`);
  };

  const replace = value => {
    newParams.delete(param);
    if (Array.isArray(value)) {
      value.forEach(v => newParams.append(param, v));
    } else {
      newParams.set(param, value);
    }
    router.replace(`?${newParams.toString()}`);
  };

  const remove = value => {
    if (value) {
      newParams.delete(param, value);
    } else {
      newParams.delete(param);
    }
    router.replace(`?${newParams.toString()}`);
  };
  return { add, replace, set: replace, remove };
}
