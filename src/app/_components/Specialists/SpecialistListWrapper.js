'use client';

import PropTypes from 'prop-types';
import { SpecialistListMain } from '@components/Specialists/SpecialistListMain';
import { useSearchParams } from 'next/navigation';
import { SpecialistListWithMap } from '@components/Specialists/SpecialistListWithMap';
import { SearchProvider } from '@components/SearchInput/SearchContext';
import { SearchInput } from '@components/SearchInput';
import { Filters } from '@components/Specialists/Filters';
import React from 'react';

export function SpecialistListWrapper({ className }) {
  const searchParams = useSearchParams();
  const isMapMode = searchParams.get('mode') === 'map';

  return (
    <section className={className}>
      <SearchProvider>
        <SearchInput />
      </SearchProvider>
      <Filters />
      {isMapMode ? (
        <SpecialistListWithMap mapMode={isMapMode} className="mt-6" />
      ) : (
        <SpecialistListMain mapMode={isMapMode} className="mx-auto mt-6 max-w-[900px]" />
      )}
    </section>
  );
}

SpecialistListWrapper.propTypes = {
  className: PropTypes.string,
};
