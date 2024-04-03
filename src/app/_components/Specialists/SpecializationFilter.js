'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListSpecialization, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSearchParams } from 'next/navigation';

function SpecializationList() {
  const { data: specializations, isLoading } = useListSpecialization();
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  const searchParams = useSearchParams();
  const { add, remove } = useSetParam('specialization');

  const onChange = specialization => {
    if (selectedSpecializations.includes(specialization)) {
      remove(specialization);
    } else {
      add(specialization);
    }
  };

  useEffect(() => {
    const specializationsInUrl = searchParams.getAll('specialization');
    setSelectedSpecializations(specializationsInUrl);
  }, [searchParams]);

  if (isLoading) return <CircularProgress />;

  if (!isLoading && !specializations?.length) return null;

  return (
    <>
      <ul>
        {specializations.map(specialization => {
          const { id, name } = specialization;
          return (
            <li key={id} className="w-[280px] md:w-[300px]">
              <CheckBox
                name={id}
                value={id}
                key={id}
                checked={selectedSpecializations.includes(id)}
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

export function SpecializationFilter() {
  const specializationsInUrl = useSearchParams().getAll('specialization');

  return (
    <FilterBase filterText="Посада" count={specializationsInUrl?.length || 0}>
      <SpecializationList />
    </FilterBase>
  );
}
