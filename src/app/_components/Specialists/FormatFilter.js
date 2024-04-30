'use client';

import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useDebounceCallback, useSetParam } from '@hooks';
import PropTypes from 'prop-types';
import { specialistFiltersConfig } from '@components/Specialists/Filters/utils';
import { INPUT_DEBOUNCE } from '@/lib/consts';

function FormatList({ options, formatsInUrl }) {
  const formatParam = useSetParam(specialistFiltersConfig.format.filterKey);
  const [selectedFormats, setSelectedPrices] = useState(formatsInUrl);

  useEffect(() => {
    setSelectedPrices(formatsInUrl);
  }, [formatsInUrl])
  const setParamDebounced = useDebounceCallback(prices => {
    formatParam.replace(prices);
  }, INPUT_DEBOUNCE);

  const onChange = format => {
    const updatedFormats = selectedFormats.includes(format)
      ? selectedFormats.filter(it => it !== format)
      : [...selectedFormats, format];
    setSelectedPrices(updatedFormats);
    setParamDebounced(updatedFormats);
  };

  return (
    <>
      <ul>
        {options.map(format => (
          <li key={format.value} className="w-[280px] md:w-[300px]">
            <CheckBox
              name={format.value}
              value={format.value}
              checked={selectedFormats.includes(format.value)}
              onChange={() => onChange(format.value)}
              text={format.label}
            />
          </li>
        ))}
      </ul>
      <ClearFilterButton
        clear={() => {
          formatParam.remove();
          setSelectedPrices([]);
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

export function FormatFilter({ searchParams }) {
  const formatsInUrl = searchParams.getAll(specialistFiltersConfig.format.filterKey);
  return (
    <FilterBase filterText="Формат роботи" count={Number(formatsInUrl.length)}>
      <FormatList formatsInUrl={formatsInUrl} options={specialistFiltersConfig.format.options} />
    </FilterBase>
  );
}

FormatFilter.propTypes = {
  searchParams: PropTypes.object.isRequired,
};