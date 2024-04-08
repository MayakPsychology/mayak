import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { Heading } from '@components/Typography';
import { DistrictList } from '@components/MainPageSections/DistrictList';
import { prisma } from '@/lib/db';

export async function DistrictSearchSection({ className }) {
  const districtsList = await prisma.district.findMany();
  const optionsList = districtsList
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, district) => [...acc, district], [{ id: 'all-districts', name: 'Усі' }]);

  return (
    <section className={cn('mx-auto w-full max-w-[900px] overflow-visible px-4 lg:px-0', className)}>
      <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
        Райони міста Львова
      </Heading>
      <DistrictList list={optionsList} className="mt-4" />
    </section>
  );
}

DistrictSearchSection.propTypes = {
  className: PropTypes.string,
};
