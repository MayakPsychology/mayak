import PropTypes from 'prop-types';
import {  CardSpecialist } from '@/app/_components/CardSpecialist';
import { getSpecialistById, getSpecialistsIds } from '@/app/(app)/specialist/utils';

export async function generateStaticParams() {
  return getSpecialistsIds()
}

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const specialist = await getSpecialistById({ id });
    return {
      title: `${specialist.lastName} ${specialist.firstName}`,
      description: specialist.description
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

  const specialist = await getSpecialistById({ id });
  return <CardSpecialist specialist={specialist} extended className={cardStyle} />;
}

Page.propTypes = {
  params: PropTypes.shape({id: PropTypes.string})
}
