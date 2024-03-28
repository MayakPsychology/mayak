import React from 'react';
import { SpecialistList } from '@components/Specialists/SpecialistList';
import { Filters } from '@components/Specialists/Filters';
import { env } from '@/lib/env';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default function Page() {
  return (
    <div className="mx-auto mb-4 max-w-[900px] px-4 lg:mb-16 lg:px-0">
      <Filters />
      <SpecialistList className="mt-5 md:mt-6" />
    </div>
  );
}
