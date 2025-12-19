import { useRouter, useSearchParams } from 'next/navigation';

export function useSetParam(param) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams);
  const replaceWithNewParams = () => router.replace(`?${newParams.toString()}`);

  const add = (value, p = param) => {
    newParams.append(p, value);
    replaceWithNewParams();
  };

  const replace = (value, p = param) => {
    newParams.delete(p);
    const values = Array.isArray(value) ? value : [value];
    values.forEach(v => newParams.append(p, v));
    replaceWithNewParams();
  };

  const remove = (value, p = param) => {
    newParams.delete(p, value);
    replaceWithNewParams();
  };

  const bulkUpdate = values => {
    Object.entries(values).forEach(([key, { method, value }]) => {
      if (method === 'add') add(value, key);
      if (method === 'replace') replace(value, key);
      if (method === 'remove') remove(value, key);
    });
  };

  return { add, replace, set: replace, remove, bulkUpdate };
}
