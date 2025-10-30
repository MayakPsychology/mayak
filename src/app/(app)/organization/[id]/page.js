import PropTypes from 'prop-types';
import { CardOrganization } from '@/app/_components/CardSpecialist';
import { getOrganizationById, getOrganizationsIds } from '@/app/(app)/specialist/utils';

export async function generateStaticParams() {
  return getOrganizationsIds()
}

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const organization = await getOrganizationById({ id });
    return {
      title: organization.name,
      description: organization.description,
    }
  } catch (e) {
    return {
      title: 'Маяк',
      description: 'Опис спеціаліста',
    };
  }
}

export default async function Page({ params }) {
  const { id } = params;
  const cardStyle = 'mx-auto my-6 max-w-[900px] px-4 md:my-10 lg:px-0';
  const organization = await getOrganizationById({ id });
  return <CardOrganization organization={organization} extended className={cardStyle} />;
}

Page.propTypes = {
  params: PropTypes.shape({id: PropTypes.string})
}
