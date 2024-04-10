import { useRouter, useSearchParams } from 'next/navigation';

export function useSetParam(param) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams);
  const add = value => {
    newParams.append(param, value);
    router.push(`?${newParams.toString()}`);
  };

  const replace = value => {
    newParams.delete(param);
    newParams.set(param, value);
    router.push(`?${newParams.toString()}`);
  };

  const remove = value => {
    if (value) {
      newParams.delete(param, value);
    } else {
      newParams.delete(param);
    }
    router.replace(`?${newParams.toString()}`);
  };
  return { add, replace, remove };
}
