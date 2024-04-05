import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

const key = 'donationDetails';

async function getDonationDetails() {
  return ky('/api/donationDetails').json();
}

export function useDonationDetails() {
  return useQuery({
    queryKey: [key],
    queryFn: getDonationDetails,
  });
}
