'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { CardOrganization, CardSpecialist } from '@components/CardSpecialist';
import { useListEntries } from '@hooks';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';

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

export function SpecialistList({ className }) {
  const searchParams = useSearchParams();
  const { data, isLoading } = useListEntries(searchParams.toString());
  const cardStyle = 'my-6 max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 md:my-10 md:p-10 lg:mx-auto';
  if (isLoading)
    return (
      <div className="mx-auto w-max">
        <CircularProgress size={50} />
      </div>
    );

  if (!isLoading && !data?.data?.length) return null;

  const { data: entries, totalCount } = data;

  return (
    <>
      <ul className={className}>
        <p className="hidden font-bold uppercase text-primary-600 md:block">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
        {entries.map(entry => (
          <li id={entry.id} key={entry.id}>
            {entry.gender ? (
              <CardSpecialist className={cardStyle} specialist={entry} />
            ) : (
              <CardOrganization className={cardStyle} organization={entry} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

SpecialistList.propTypes = {
  className: PropTypes.string,
};
