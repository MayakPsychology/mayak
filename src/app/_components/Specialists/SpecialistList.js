'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardOrganization, CardSpecialist } from '@components/CardSpecialist';
import { CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';
import { usePaginatedEntries } from '@/app/_hooks';
import { NoInfoToShow } from '../NoInfoToShow';

function getProperEnding(count) {
  const lastDigit = count % 10;
  if (_.range(11, 15).includes(count)) {
    return 'результатів';
  }
  if (_.range(2, 5).includes(lastDigit)) {
    return 'результати';
  }
  if (lastDigit === 1) {
    return 'результат';
  }
  return 'результатів';
}
const loadingTextStyles =
  'align-center px-auto flex h-10 w-[170px] flex-col justify-center gap-2 self-center rounded-[100px] bg-primary-200 px-[10px] text-center text-p4 font-bold text-gray-700';

export function SpecialistList({ className }) {
  const searchParams = useSearchParams();

  const { ref, inView } = useInView();

  const { data, error, isLoading, hasNextPage, fetchNextPage, isSuccess } = usePaginatedEntries(searchParams);
  const totalCount = data?.pages?.length && data.pages[0].metaData?.totalCount;

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [hasNextPage, inView]);

  const cardStyle = 'my-6 max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 md:my-10 md:p-10 lg:mx-auto';

  if (isLoading)
    return (
      <div className="mx-auto w-max">
        <CircularProgress size={50} />
      </div>
    );

  const isNoMatches = !isLoading && (!data?.pages?.length || totalCount === 0);
  if (isNoMatches)
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

  return (
    <section>
      <ul className={className}>
        {totalCount && (
          <p className="hidden font-bold uppercase text-primary-600 md:block">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
        )}
        <>
          {isSuccess &&
            data.pages?.map(page =>
              page.data?.map(entry => (
                <li id={entry.id} key={entry.id}>
                  {entry.specialist ? (
                    <CardSpecialist className={cardStyle} specialist={entry.specialist} />
                  ) : (
                    <CardOrganization className={cardStyle} organization={entry.organization} />
                  )}
                </li>
              )),
            )}

          {isLoading ||
            (hasNextPage && (
              <div className="mx-auto flex flex-col" ref={ref}>
                <p className={loadingTextStyles}>Завантажується</p>
              </div>
            ))}
          {error && <div className="mt-10">{('An error has occurred: ', error.message)}</div>}
        </>
      </ul>
    </section>
  );
}

SpecialistList.propTypes = {
  className: PropTypes.string,
};
