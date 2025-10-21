import ky from 'ky';
import { useQuery } from '@tanstack/react-query';
import { specialistFiltersConfig } from '@/app/_components/Specialists/Filters/utils';

export const searchSyncKey = 'searchSyncKey';

export function useSearchSync(query, searchType, minQueryLength = 1) {
  const hookProps = useQuery({
    queryKey: [searchSyncKey, query, searchType],
    queryFn: () => {
      const baseQueryString = `${specialistFiltersConfig.specialistType.filterKey}=${searchType}&query=${query}`;
      return ky(`/api/search/sync?${baseQueryString}`).json();
    },
    enabled: query.length >= minQueryLength,
  });
  return {
    // eslint-disable-next-line @tanstack/query/no-rest-destructuring 
    ...hookProps,
    data: hookProps.data?.data,
  };
}
