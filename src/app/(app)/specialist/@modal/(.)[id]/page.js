import { redirect } from 'next/navigation';
import { CardSpecialistExtended, CardOrganizationExtended } from '@/app/_components/CardSpecialist';
import { getOrganizationById, getSpecialistById } from '@/app/(app)/specialist/utils';

export default async function Page({ params, searchParams }) {
  const { id } = params;
  const { type } = searchParams;

  if (type === 'specialist') {
    const specialist = await getSpecialistById({ id });
    return <CardSpecialistExtended specialist={specialist} />;
  }
  if (type === 'organization') {
    const organization = await getOrganizationById({ id });
    return <CardOrganizationExtended organization={organization} />;
  }
  return redirect('/error');
}
