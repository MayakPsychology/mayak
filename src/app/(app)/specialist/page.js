import React from 'react';
import { SpecialistList } from '@components/Specialists/SpecialistList';
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
    <div className="mx-auto mb-16 max-w-[900px] px-4 lg:px-0">
      <div className="pt-6">
        <SearchProvider>
          <SearchInput />
        </SearchProvider>
        <Filters />
      </div>
      <SpecialistList className="mt-[-1.5rem] md:mt-[22px]" />
    </div>
  );
}
