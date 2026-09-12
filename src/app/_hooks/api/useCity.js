import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

const cityKey = 'city';

export function useListCity({ withDistricts = false } = {}) {
  return useQuery({
    queryKey: [cityKey, withDistricts],
    queryFn: () => ky('/api/city', { searchParams: { withDistricts } }).json(),
  });
}
