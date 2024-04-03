import { redirect } from 'next';
import { CardSpecialist, CardOrganization } from '@/app/_components/CardSpecialist';
import { getSpecialistById, getOrganizationById } from '@/app/(app)/specialist/utils';

export async function generateMetadata({ params, searchParams }) {
  try {
    const { id } = params;
    const { type } = searchParams;

    let title;
    let description;

    if (type === 'specialist') {
      const specialist = await getSpecialistById({ id });
      title = `${specialist.lastName} ${specialist.firstName}`;
      description = specialist.description;
      return { title, description };
    }
    if (type === 'organization') {
      const organization = await getOrganizationById({ id });
      title = organization.name;
      description = organization.description;
      return { title, description };
    }
    return {
      title,
      description,
    };
  } catch (e) {
    return {
      title: 'Маяк',
      description: 'Опис спеціаліста',
    };
  }
}

export default async function Page({ params, searchParams }) {
  const { id } = params;
  const { type } = searchParams;
  const cardStyle = 'mx-auto my-6 max-w-[900px] px-4 md:my-10 lg:px-0';

  if (type === 'specialist') {
    const specialist = await getSpecialistById({ id });
    return <CardSpecialist specialist={specialist} extended className={cardStyle} />;
  }
  if (type === 'organization') {
    const organization = await getOrganizationById({ id });
    return <CardOrganization organization={organization} extended className={cardStyle} />;
  }

  return redirect('/error');
}
