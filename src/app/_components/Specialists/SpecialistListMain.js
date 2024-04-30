'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardOrganization, CardSpecialist } from '@components/CardSpecialist';
import { useInView } from 'react-intersection-observer';
import { getProperEnding } from '@components/Specialists/utils';
import { MapLink } from '@components/MapLink';
import { cn } from '@utils/cn';
import { PaginationLoader } from '@components/Specialists/PaginationLoader';
import { NoMatches } from '@components/Specialists/NoMatches';
import { usePaginatedEntries } from '@/app/_hooks';
import Loading from '@/app/loading';

export function SpecialistListMain({ mapMode, className, searchParams }) {
  const { ref, inView } = useInView();

  const { data, error, isPending, hasNextPage, fetchNextPage, isSuccess } = usePaginatedEntries(searchParams);
  const totalCount = data?.pages?.length && data.pages[0].metaData?.totalCount;

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [hasNextPage, inView]);

  const cardStyle = 'my-6 rounded-3xl border-2 border-gray-200 px-4 py-5 md:p-10 lg:mx-auto';

  if (isPending) return <Loading />;

  const isNoMatches = !isPending && (!data?.pages?.length || totalCount === 0);

  if (isNoMatches) return <NoMatches />;

  return (
    <div className={className}>
      <ul>
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

          {isPending || (hasNextPage && <PaginationLoader innerRef={ref} />)}
          {error && <div className="mt-10">{`An error has occurred: ${error.message}`}</div>}
        </>
      </ul>
      {!inView && (
        <MapLink mapMode={mapMode} className={cn('sticky bottom-6 mx-auto my-6 max-w-max', { hidden: mapMode })} />
      )}
    </div>
  );
}

SpecialistListMain.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
  searchParams: PropTypes.object.isRequired,
};
