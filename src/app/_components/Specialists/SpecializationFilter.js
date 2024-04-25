'use client';

import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListSpecialization, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useDebounceCallback } from '@/app/_hooks';
import { INPUT_DEBOUNCE } from '@/lib/consts';

function SpecializationList({ specializationsInUrl }) {
  const specializationParam = useSetParam('specialization');
  const [selectedSpecializations, setSelectedSpecializations] = useState(specializationsInUrl);
  const { data: specializationList, isLoading } = useListSpecialization();

  const setParamDebounced = useDebounceCallback(districts => {
    specializationParam.replace(districts);
  }, INPUT_DEBOUNCE);

  const onChange = specialization => {
    const updatedSpecializations = selectedSpecializations.includes(specialization)
      ? selectedSpecializations.filter(it => it !== specialization)
      : [...selectedSpecializations, specialization];
    setSelectedSpecializations(updatedSpecializations);
    setParamDebounced(updatedSpecializations);
  };

  if (isLoading) return <CircularProgress />;

  if (!specializationList?.length) return null;

  return (
    <>
      <ul>
        {specializationList.map(specialization => {
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
          specializationParam.remove();
          setSelectedSpecializations([]);
        }}
      />
    </>
  );
}

SpecializationList.propTypes = {
  specializationsInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function SpecializationFilter() {
  const specializationsInUrl = useSearchParams().getAll('specialization') || [];

  return (
    <FilterBase filterText="Посада" count={specializationsInUrl.length}>
      <SpecializationList specializationsInUrl={specializationsInUrl} />
    </FilterBase>
  );
}
