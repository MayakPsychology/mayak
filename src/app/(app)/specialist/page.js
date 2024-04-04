import React from 'react';
import { SpecialistListWrapper } from '@components/Specialists/SpecialistListWrapper';
import { Filters } from '@components/Specialists/Filters';
import { env } from '@/lib/env';
import { SearchProvider } from '@/app/_components/SearchInput/SearchContext';
import { SearchInput } from '@/app/_components/SearchInput';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default function Page() {
  return (
    <div className="mx-auto mb-16 max-w-max px-4 md:max-w-[1200px]">
      <div className="pt-6">
        <SearchProvider>
          <SearchInput />
        </SearchProvider>
        <Filters />
      </div>
      <SpecialistListWrapper className="mt-8 md:mt-6" />
    </div>
  );
}
