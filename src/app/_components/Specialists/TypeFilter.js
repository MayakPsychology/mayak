'use client';

import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { therapyFilterPropType } from '@components/Specialists/Filters/propTypes';
import { specialistFiltersConfig } from '@components/Specialists/Filters/utils';

function TypeList({ options, typeInUrl }) {
  const [selectedType, setSelectedType] = useState(typeInUrl);

  const { replace, remove } = useSetParam(specialistFiltersConfig.type.filterKey);

  const onChange = type => {
    replace(type);
  };

  useEffect(() => {
    setSelectedType(typeInUrl);
  }, [typeInUrl]);

  return (
    <>
      <ul>
        {options.map(therapy => {
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

TypeList.propTypes = {
  options: PropTypes.arrayOf(therapyFilterPropType),
  typeInUrl: PropTypes.string,
};

export function TypeFilter({ options }) {
  const typeInUrl = useSearchParams().get(specialistFiltersConfig.type.filterKey);

  return (
    <FilterBase filterText="Тип" count={Number(!!typeInUrl)}>
      <TypeList options={options} typeInUrl={typeInUrl} />
    </FilterBase>
  );
}

TypeFilter.propTypes = {
  options: PropTypes.arrayOf(therapyFilterPropType),
};
