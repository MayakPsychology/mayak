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
  return <SpecialistListWrapper className="my-8 md:my-6" />;
}
