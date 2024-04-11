import { useRouter, useSearchParams } from 'next/navigation';

export function useSetParam(param) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams);
  const replaceWithNewParams = () => router.replace(`?${newParams.toString()}`);

  const add = value => {
    newParams.append(param, value);
    replaceWithNewParams();
  };

  const replace = value => {
    newParams.delete(param);
    const values = Array.isArray(value) ? value : [value];
    values.forEach(v => newParams.append(param, v));
    replaceWithNewParams();
  };

  const remove = value => {
    newParams.delete(param, value);
    replaceWithNewParams();
  };

  return { add, replace, set: replace, remove };
}
