import { CardSpecialistExtended } from '@/app/_components/CardSpecialist';
import { getSpecialistById } from '@/app/(app)/specialist/utils';

export default async function Page({ params }) {
  const { id } = params;
  const specialist = await getSpecialistById({ id });
  return <CardSpecialistExtended specialist={specialist} />;
}
