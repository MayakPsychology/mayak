import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

export const searchSyncKey = 'searchSyncKey';

export function useSearchSync(query, searchType, minQueryLength = 1) {
  const hookProps = useQuery({
    queryKey: [searchSyncKey, query, searchType],
    queryFn: () => {
      const baseQueryString = `searchType=${searchType}&query=${query}`;
      return ky(`/api/search/sync?${baseQueryString}`).json();
    },
    enabled: query.length >= minQueryLength,
  });
  return {
    ...hookProps,
    data: hookProps.data?.data,
  };
}
