import { CardOrganizationExtended } from '@/app/_components/CardSpecialist';
import { getOrganizationById } from '@/app/(app)/specialist/utils';

export default async function Page({ params }) {
  const { id } = params;

  const organization = await getOrganizationById({ id });
  return <CardOrganizationExtended organization={organization} />;

}
