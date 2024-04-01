'use client';

import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListSpecialization, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

function SpecializationList({ setCount, defaultValue }) {
  const { data: specializations, isLoading } = useListSpecialization();
  const [selectedSpecializations, setSelectedSpecializations] = useState(defaultValue);

  const { add, remove } = useSetParam('specialization');

  const onChange = specialization => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(
        selectedSpecializations.filter(selSpecialization => selSpecialization !== specialization),
      );
      setCount(count => count - 1);
      remove(specialization);
    } else {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
      setCount(count => count + 1);
      add(specialization);
    }
  };

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
          setSelectedSpecializations([]);
          setCount(0);
          remove();
        }}
      />
    </>
  );
}

export function SpecializationFilter() {
  const specializationsInUrl = useSearchParams().getAll('specializations');
  const [count, setCount] = useState(specializationsInUrl.length);
  return (
    <FilterBase filterText="Посада" count={count}>
      <SpecializationList setCount={setCount} defaultValue={specializationsInUrl} />
    </FilterBase>
  );
}

SpecializationList.propTypes = {
  setCount: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
};
