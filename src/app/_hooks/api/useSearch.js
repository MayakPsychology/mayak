import ky from 'ky';
import { useInfiniteQuery, useQuery, keepPreviousData } from '@tanstack/react-query';

const listEntries = searchParams => ky('/api/search', { searchParams }).json();
const listEntriesCount = searchParams => ky('/api/search/count', { searchParams }).json();

export const useListEntriesCount = searchParams =>
  useQuery({
    queryKey: [`count_${searchParams}`],
    retry: 0,
    placeholderData: keepPreviousData,
    queryFn: () => listEntriesCount(searchParams),
  });

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
    // this is needed for auto-invalidate query when changing url query params
    queryKey: [searchParams.toString()],
    placeholderData: keepPreviousData,
    retry: 0,
    queryFn: ({ pageParam = '' }) => {
      // just in case there is immutable instance passed
      const params = new URLSearchParams(searchParams);
      params.set('lastCursor', pageParam);
      return listEntries(params);
    },
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });
