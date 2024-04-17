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

export function SpecialistListWrapper({ className, searchParams, filterData }) {
  const isMapMode = searchParams.mode === 'map';
  return (
    <section className={cn('mx-auto px-4 lg:max-w-[900px]', { 'lg:max-w-[1600px]': isMapMode }, className)}>
      <SearchProvider>
        <SearchInput />
      </SearchProvider>
      <Filters filterData={filterData} />
      {isMapMode ? (
        <SpecialistListWithMap mapMode={isMapMode} className="mt-6" />
      ) : (
        <SpecialistListMain mapMode={isMapMode} className="mx-auto mt-6" />
      )}
    </section>
  );
}

SpecialistListWrapper.propTypes = {
  className: PropTypes.string,
  searchParams: PropTypes.object,
  filterData: filterDataPropTypes,
};
