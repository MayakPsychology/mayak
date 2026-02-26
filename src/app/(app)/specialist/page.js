import React from 'react';
import { SpecialistListWrapper } from '@components/Specialists/SpecialistListWrapper';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

export const revalidate = Number(process.env.REVALIDATION_TIME ?? 7200);

// eslint-disable-next-line react/prop-types
export default function Page({ searchParams }) {
  return <SpecialistListWrapper searchParams={searchParams} className="my-8 md:my-6" />;
}
