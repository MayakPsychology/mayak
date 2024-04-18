import React from 'react';
import { SpecialistListWrapper } from '@components/Specialists/SpecialistListWrapper';
import { env } from '@/lib/env';
import { getFilterData } from './actions';

export const metadata = {
  title: 'Спеціалісти',
  description: 'Список доступних спеціалістів',
};

const { REVALIDATION_TIME } = env;

export const revalidate = REVALIDATION_TIME;

export default async function Page({ searchParams }) {
  const filterData = await getFilterData();
  return <SpecialistListWrapper filterData={filterData} searchParams={searchParams} className="my-8 md:my-6" />;
}
