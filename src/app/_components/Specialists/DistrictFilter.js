'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListDistrict, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSearchParams } from 'next/navigation';

function DistrictList() {
  const { data: districts, isLoading } = useListDistrict();
  const [selectedDistricts, setSelectedDistricts] = useState();

  const searchParams = useSearchParams();
  const { add, remove } = useSetParam('district');

  const onChange = district => {
    if (selectedDistricts.includes(district)) {
      remove(district);
    } else {
      add(district);
    }
  };

  useEffect(() => {
    const districtsInUrl = searchParams.getAll('district');
    setSelectedDistricts(districtsInUrl);
  }, [searchParams]);

  if (isLoading) return <CircularProgress />;

  if (!isLoading && !districts?.length) return null;

  return (
    <>
      <ul>
        {districts.map(district => {
          const { id, name } = district;
          return (
            <li key={id} className="w-[280px] md:w-[300px]">
              <CheckBox
                name={id}
                value={id}
                key={id}
                checked={selectedDistricts?.includes(id)}
                onChange={() => onChange(id)}
                text={name}
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

export function DistrictFilter() {
  const districtsInUrl = useSearchParams().getAll('district');

  return (
    <FilterBase filterText="Райони" count={districtsInUrl?.length || 0}>
      <DistrictList />
    </FilterBase>
  );
}
