import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

const specializationKey = 'specialization';

async function listSpecialization() {
  return ky('/api/specialization').json();
}

export function useListSpecialization() {
  return useQuery({
    queryKey: [specializationKey],
    queryFn: listSpecialization,
  });
}
