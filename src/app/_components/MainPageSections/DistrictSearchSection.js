import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { Heading } from '@components/Typography';
import { DistrictList } from '@components/MainPageSections/DistrictList';
import { MapLink } from '@components/MapLink';
import { prisma } from '@/lib/db';

export async function DistrictSearchSection({ className }) {
  const districtsList = await prisma.district.findMany();
  const optionsList = districtsList
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, district) => [...acc, district], [{ id: 'all-districts', name: 'Усі' }]);

  return (
    <section className={cn('mx-auto max-w-max px-4 lg:min-w-[900px]', className)}>
      <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
        Райони міста Львова
      </Heading>
      <DistrictList list={optionsList} className="mt-4" />
      <MapLink enableAnimation={false} className="mx-auto my-6 mt-8 hidden max-w-max lg:flex" />
    </section>
  );
}

DistrictSearchSection.propTypes = {
  className: PropTypes.string,
};
