'use client';

import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { specialistFiltersConfig } from '@components/Specialists/Filters/utils';

function FormatList({ options, formatsInUrl }) {
  const [selectedFormat, setSelectedFormat] = useState(formatsInUrl);

  const { remove, add } = useSetParam(specialistFiltersConfig.format.filterKey);

  const onChange = format => {
    if (formatsInUrl.includes(format)) {
      remove(format);
    } else {
      add(format);
    }
  };

  useEffect(() => {
    setSelectedFormat(formatsInUrl);
  }, [formatsInUrl]);

  return (
    <>
      <ul>
        {options.map(format => (
          <li key={format.value} className="w-[280px] md:w-[300px]">
            <CheckBox
              name={format.value}
              value={format.value}
              checked={selectedFormat.includes(format.value)}
              onChange={() => onChange(format.value)}
              text={format.label}
            />
          </li>
        ))}
      </ul>
      <ClearFilterButton
        clear={() => {
          remove();
        }}
      />
    </>
  );
}

FormatList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  formatsInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function FormatFilter() {
  const formatsInUrl = useSearchParams().getAll(specialistFiltersConfig.format.filterKey);

  return (
    <FilterBase filterText="Формат роботи" count={Number(formatsInUrl.length)}>
      <FormatList formatsInUrl={formatsInUrl} options={specialistFiltersConfig.format.options} />
    </FilterBase>
  );
}
