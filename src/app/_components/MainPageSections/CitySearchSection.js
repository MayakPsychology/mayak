import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { Heading } from '@components/Typography';
import { DistrictList } from '@components/MainPageSections/DistrictList';
import { MapLinkButton } from '@components/MapLinkButton';
import { unstable_cache as unstableCache } from 'next/cache';
import { prisma } from '@/lib/db';

const getCachedCities = unstableCache(
  async () =>
    prisma.city.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ['cities-list'],
  { revalidate: 3600, tags: ['cities'] },
);

export async function CitySearchSection({ className }) {
  const cities = await getCachedCities();
  const optionsList = [{ id: 'all-cities', name: 'Усі' }, ...cities];

  return (
    <section className={cn('px-4 lg:px-[80px]', className)}>
      <div className="mx-auto max-w-[910px]">
        <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
          Міста України
        </Heading>
        <div className="lg:*:w-[940px] xl:*:w-[1000px]">
          <DistrictList list={optionsList} paramName="city" className="mx-auto mt-4" />
          <MapLinkButton enableAnimation={false} className="mx-auto my-6 mt-8 hidden max-w-max lg:flex" />
        </div>
      </div>
    </section>
  );
}

CitySearchSection.propTypes = {
  className: PropTypes.string,
};
