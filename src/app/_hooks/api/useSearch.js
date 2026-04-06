import ky from 'ky';
import { useInfiniteQuery, useQuery, keepPreviousData } from '@tanstack/react-query';

const listEntries = searchParams => ky('/api/search', { searchParams }).json();

export const useListEntries = searchParams =>
  useQuery({
    queryKey: ['entries', searchParams.toString()],
    queryFn: () => {
      const params = Object.fromEntries(searchParams.entries());
      return listEntries(params);
    },
    placeholderData: keepPreviousData,
    retry: 0,
  });

export const usePaginatedEntries = (searchParams, take = 5) =>
  useInfiniteQuery({
    queryKey: ['entries', searchParams.toString(), take],

    placeholderData: keepPreviousData,
    retry: 0,
    initialPageParam: 0,

    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams(searchParams);

      params.set('skip', String(pageParam));
      params.set('take', String(take));

      return listEntries(params);
    },

    getNextPageParam: (lastPage, allPages) => {
      const { metaData } = lastPage;

      if (!metaData?.hasNextPage) return undefined;

      return allPages.length * take;
    },
  });
