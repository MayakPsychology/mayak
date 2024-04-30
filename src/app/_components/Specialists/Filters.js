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
import PropTypes from 'prop-types';

export function Filters({ filterData, searchParams }) {
  return (
    <section className="relative z-10 -mb-[250px] inline-flex w-full flex-col items-start gap-6 py-6">
      <div className="no-scrollbar relative flex w-full touch-pan-x content-start items-start gap-4 overflow-x-auto lg:overflow-x-visible">
        <AllFilters filterData={filterData} searchParams={searchParams}/>
        <TypeFilter options={filterData.therapies} searchParams={searchParams}/>
        <SpecializationFilter options={filterData.specializations} searchParams={searchParams}/>
        <DistrictFilter options={filterData.districts || []} searchParams={searchParams}/>
        <PriceFilter searchParams={searchParams}/>
        <FormatFilter searchParams={searchParams}/>
      </div>
    </section>
  );
}

Filters.propTypes = {
  filterData: filterDataPropTypes,
  searchParams: PropTypes.object.isRequired,
};
