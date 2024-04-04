'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam, useListTherapies } from '@hooks';
import { useSearchParams } from 'next/navigation';

function TypeList() {
  const { data: therapies, isLoading } = useListTherapies();
  const [selectedType, setSelectedType] = useState();

  const searchParams = useSearchParams();
  const { replace, remove } = useSetParam('type');

  const onChange = type => {
    replace(type);
  };

  useEffect(() => {
    const typeInUrl = searchParams.get('type');
    setSelectedType(typeInUrl);
  }, [searchParams]);

  if (!isLoading && !therapies?.length) return null;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <ul>
        {therapies.map(therapy => {
          const { type, title } = therapy;
          return (
            <li key={type} className="w-[280px] md:w-[300px]">
              <CheckBox
                name="type"
                value={type}
                key={type}
                type="radio"
                checked={selectedType === type}
                onChange={() => onChange(type)}
                text={title}
              />
            </li>
          );
        })}
      </ul>
      <ClearFilterButton
        clear={() => {
          remove();
        }}
      />
    </>
  );
}

export function TypeFilter() {
  const typeInUrl = useSearchParams().get('type');

  return (
    <FilterBase filterText="Тип" count={Number(!!typeInUrl)}>
      <TypeList />
    </FilterBase>
  );
}
