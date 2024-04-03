import ky from 'ky';
import { useInfiniteQuery } from '@tanstack/react-query';

const listEntries = searchParams => ky('/api/search', { searchParams }).json();

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
