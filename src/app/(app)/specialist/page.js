import React from 'react';
import { SpecialistListWrapper } from '@components/Specialists/SpecialistListWrapper';
import { env } from '@/lib/env';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default function Page() {
  return (
    <div className="mx-auto mb-16 px-4 md:max-w-max lg:min-w-[900px]">
      <SpecialistListWrapper className="mt-8 md:mt-6" />
    </div>
  );
}
