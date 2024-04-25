'use client';

import {
  DistrictFilter,
  FormatFilter,
  PriceFilter,
  SpecializationFilter,
  TypeFilter,
  AllFilters,
} from '@components/Specialists';
import { filterDataPropTypes } from '@components/Specialists/Filters/propTypes';

export function Filters({ filterData }) {
  return (
    <section className="relative z-10 -mb-[250px] inline-flex w-full flex-col items-start gap-6 py-6">
      <div className="no-scrollbar relative flex w-full touch-pan-x content-start items-start gap-4 overflow-x-auto lg:overflow-x-visible">
        <AllFilters filterData={filterData} />
        <TypeFilter options={filterData.therapies} />
        <SpecializationFilter options={filterData.specializations} />
        <DistrictFilter options={filterData.districts || []} />
        <PriceFilter />
        <FormatFilter />
      </div>
    </section>
  );
}

Filters.propTypes = {
  filterData: filterDataPropTypes,
};
