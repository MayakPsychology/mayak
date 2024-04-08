'use client';

import { NoInfoToShow } from '@components/NoInfoToShow';
import { useSearchParams } from 'next/navigation';

export function NoMatches() {
  const searchParams = useSearchParams();

  return (
    <div className="mt-4 flex flex-col gap-4 lg:mt-8 lg:gap-8">
      <div className="flex flex-col gap-2 text-p4 font-bold uppercase lg:flex-row lg:gap-1">
        <p className=" text-system-error">Результатів не Знайдено.</p>
        {searchParams.get('query')?.length > 0 && (
          <p className=" text-primary-600">Перевірте правильність написання запиту</p>
        )}
      </div>
      <NoInfoToShow text="збігів" />
    </div>
  );
}
