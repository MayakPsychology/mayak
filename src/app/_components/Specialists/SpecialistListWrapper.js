import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { SpecialistListMain } from '@components/Specialists/SpecialistListMain';
import { SpecialistListWithMap } from '@components/Specialists/SpecialistListWithMap';
import { SearchProvider } from '@components/SearchInput/SearchContext';
import { SearchInput } from '@components/SearchInput';
import { FiltersLoader } from '@components/Specialists/FiltersLoader';
import { cn } from '@utils/cn';

export function SpecialistListWrapper({ className, searchParams }) {
  const isMapMode = searchParams.mode === 'map';

  return (
    <section className={cn('mx-auto px-4 lg:max-w-[900px]', { 'lg:max-w-[1600px]': isMapMode }, className)}>
      <SearchProvider>
        <SearchInput />
      </SearchProvider>
      <Suspense fallback={null}>
        <FiltersLoader searchParams={searchParams} />
      </Suspense>
      {isMapMode ? (
        <SpecialistListWithMap mapMode={isMapMode} className="mt-6" searchParams={searchParams} />
      ) : (
        <SpecialistListMain mapMode={isMapMode} className="mx-auto mt-6" searchParams={searchParams} />
      )}
    </section>
  );
}

SpecialistListWrapper.propTypes = {
  className: PropTypes.string,
  searchParams: PropTypes.object,
};
