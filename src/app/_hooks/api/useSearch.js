import ky from 'ky';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const listEntries = searchParams => ky('/api/search', { searchParams }).json();

export const useListEntries = searchParams =>
  useQuery({
    queryKey: [searchParams.toString()],
    queryFn: () => {
      const params = Object.fromEntries(searchParams.entries());
      return listEntries(params);
    },
  });

export const usePaginatedEntries = searchParams =>
  useInfiniteQuery({
    queryKey: [searchParams.toString()],
    queryFn: ({ pageParam = '' }) => {
      const params = {
        ...Object.fromEntries(searchParams.entries()),
        lastCursor: pageParam,
      };
      return listEntries(params);
    },
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });
