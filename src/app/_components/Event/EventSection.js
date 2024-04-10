'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { allEvents, useSetParam } from '@hooks';
import { EventCard } from '@components/Event/Card';
import { SkeletonCard } from '@components/Event/SkeletonCard';
import { NoInfoToShow } from '@components/NoInfoToShow';
import { MonthFilter } from './MonthFilter';

const currentMonth = new Date().getMonth() + 1;

const monthNames = [
  { index: 0, name: 'січень', en: 'january' },
  { index: 1, name: 'лютий', en: 'february' },
  { index: 2, name: 'березень', en: 'march' },
  { index: 3, name: 'квітень', en: 'april' },
  { index: 4, name: 'травень', en: 'may' },
  { index: 5, name: 'червень', en: 'june' },
  { index: 6, name: 'липень', en: 'july' },
  { index: 7, name: 'серпень', en: 'august' },
  { index: 8, name: 'вересень', en: 'september' },
  { index: 9, name: 'жовтень', en: 'october' },
  { index: 10, name: 'листопад', en: 'november' },
  { index: 11, name: 'грудень', en: 'december' },
];

const startMonthIndex = currentMonth - 1;
const endIndex = (startMonthIndex + 6) % monthNames.length;

const filteredMonths =
  startMonthIndex > endIndex
    ? monthNames.slice(startMonthIndex).concat(monthNames.slice(0, endIndex))
    : monthNames.slice(startMonthIndex, endIndex);

export function EventSection() {
  const searchParams = useSearchParams();
  const monthFromQuery = searchParams.get('month');
  const { replace: replaceParam } = useSetParam('month');

  const [activeMonth, setActiveMonth] = useState(monthFromQuery || filteredMonths[0].index + 1);

  const { ref, inView } = useInView();

  // Fetch data and pass url params
  const { data, error, isLoading, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage } = useInfiniteQuery({
    queryFn: ({ month = activeMonth, pageParam = '' }) => allEvents({ month, take: 6, lastCursor: pageParam }),
    queryKey: ['event', activeMonth],
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [hasNextPage, inView]);

  // Filter data based on selected month
  const handleClick = useCallback(
    newMonth => {
      setActiveMonth(newMonth);
      replaceParam(newMonth.toString());
    },
    [replaceParam],
  );

  useEffect(() => {
    setActiveMonth(monthFromQuery ? Number(monthFromQuery) : filteredMonths[0].index + 1);
  }, [monthFromQuery]);

  return (
    <>
      <section className="lg:w-max-[900px] mx-auto flex w-full flex-col items-start justify-start gap-6 self-stretch">
        <MonthFilter filteredMonths={filteredMonths} handleClick={handleClick} activeMonth={activeMonth} />
        <ul className="grid w-full gap-4 self-stretch sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && new Array(6).fill(9).map((el, index) => <SkeletonCard el={el} key={index} />)}
          <>
            {isSuccess &&
              data.pages.map(page =>
                page.data.map((event, index) => {
                  if (page.data.length === index + 1)
                    return (
                      <div ref={ref} key={event.id}>
                        <EventCard event={event} />
                      </div>
                    );

                  return <EventCard key={event.id} event={event} />;
                }),
              )}
          </>
        </ul>
      </section>

      {isSuccess && !isFetchingNextPage && !hasNextPage && data.pages.length === 1 && <NoInfoToShow text="подій" />}

      {error && <div className="mt-10">{('An error has occurred: ', error.message)}</div>}
    </>
  );
}
