'use client';

import { useEffect, useState } from 'react';
import { useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { specializationFilterPropType } from '@components/Specialists/Filters/propTypes';
import { specialistFiltersConfig } from '@components/Specialists/Filters/utils';

function SpecializationList({ options, specializationsInUrl }) {
  const [selectedSpecializations, setSelectedSpecializations] = useState(specializationsInUrl);

  const { add, remove } = useSetParam(specialistFiltersConfig.specialization.filterKey);

  const onChange = specialization => {
    if (selectedSpecializations.includes(specialization)) {
      remove(specialization);
    } else {
      add(specialization);
    }
  };

  useEffect(() => {
    setSelectedSpecializations(specializationsInUrl);
  }, [specializationsInUrl]);

  return (
    <>
      <ul>
        {options.map(specialization => {
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

SpecializationList.propTypes = {
  options: PropTypes.arrayOf(specializationFilterPropType),
  specializationsInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function SpecializationFilter({ options }) {
  const specializationsInUrl = useSearchParams().getAll(specialistFiltersConfig.specialization.filterKey);

  return (
    <FilterBase filterText="Посада" count={specializationsInUrl?.length || 0}>
      <SpecializationList options={options} specializationsInUrl={specializationsInUrl} />
    </FilterBase>
  );
}

SpecializationFilter.propTypes = {
  options: PropTypes.arrayOf(specializationFilterPropType),
};
