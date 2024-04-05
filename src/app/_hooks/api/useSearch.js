import ky from 'ky';
import { useInfiniteQuery } from '@tanstack/react-query';

const listEntries = searchParams => ky('/api/search', { searchParams }).json();

export const usePaginatedEntries = searchParams =>
  useInfiniteQuery({
    queryFn: ({ pageParam = '' }) => {
      // just in case there is immutable instance passed
      const params = new URLSearchParams(searchParams);
      params.set('lastCursor', pageParam);
      return listEntries(params);
    },
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });
