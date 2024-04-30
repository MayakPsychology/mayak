'use client';

import PropTypes from 'prop-types';
import { SpecialistListMain } from '@components/Specialists/SpecialistListMain';
import { SpecialistListWithMap } from '@components/Specialists/SpecialistListWithMap';
import { SearchProvider } from '@components/SearchInput/SearchContext';
import { SearchInput } from '@components/SearchInput';
import { Filters } from '@components/Specialists/Filters';
import React from 'react';
import { cn } from '@utils/cn';
import { filterDataPropTypes } from '@components/Specialists/Filters/propTypes';
import { ReadonlyURLSearchParams } from 'next/navigation';

const toSearchParams = searchParams => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });
  return params;
}

export function SpecialistListWrapper({ className, searchParams, filterData }) {
  const isMapMode = searchParams.mode === 'map';
  const readonlySearchParams = new ReadonlyURLSearchParams(toSearchParams(searchParams));

  return (
    <section className={cn('mx-auto px-4 lg:max-w-[900px]', { 'lg:max-w-[1600px]': isMapMode }, className)}>
      <SearchProvider>
        <SearchInput />
      </SearchProvider>
      <Filters filterData={filterData} searchParams={readonlySearchParams} />
      {isMapMode ? (
        <SpecialistListWithMap mapMode={isMapMode} className="mt-6" searchParams={readonlySearchParams} />
      ) : (
        <SpecialistListMain mapMode={isMapMode} className="mx-auto mt-6" searchParams={readonlySearchParams} />
      )}
    </section>
  );
}

SpecialistListWrapper.propTypes = {
  className: PropTypes.string,
  searchParams: PropTypes.object,
  filterData: filterDataPropTypes,
};
