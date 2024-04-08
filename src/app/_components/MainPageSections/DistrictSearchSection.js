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
    <section className={cn('lg:px-[80px]', className)}>
      <div className="mx-auto max-w-[910px]">
        <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
          Райони міста Львова
        </Heading>
        <div className="lg:*:w-[940px] xl:*:w-[1000px]">
          <DistrictList list={optionsList} className="mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}

DistrictSearchSection.propTypes = {
  className: PropTypes.string,
};
