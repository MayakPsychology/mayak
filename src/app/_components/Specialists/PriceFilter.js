'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useDebounceCallback } from '@/app/_hooks';
import { INPUT_DEBOUNCE } from '@/lib/consts';
import { specialistFiltersConfig } from './Filters/utils';

const priceVariants = {
  notSpecified: 'Не зазначено',
  free: 'Безкоштовно',
  below500: 'до 500 грн',
  from500to1000: '500-1000 грн',
  from1000to1500: '1000-1500 грн',
  above1500: 'більше 1500 грн',
};

function PricesList({ pricesInUrl }) {
  const priceParam = useSetParam(specialistFiltersConfig.price.filterKey.price);

  const [selectedPrices, setSelectedPrices] = useState(pricesInUrl);
  useEffect(() => {
    setSelectedPrices(pricesInUrl);
  }, [pricesInUrl]);

  const setParamDebounced = useDebounceCallback(prices => {
    priceParam.bulkUpdate({
      [specialistFiltersConfig.price.filterKey.price]: {
        method: 'replace',
        value: prices
      },
      [specialistFiltersConfig.price.filterKey.priceMin]: {
        method: 'remove',
      },
      [specialistFiltersConfig.price.filterKey.priceMax]: {
        method: 'remove',
      },
    });
  }, INPUT_DEBOUNCE);

  const onChange = price => {
    const updatedPrices = selectedPrices.includes(price)
      ? selectedPrices.filter(it => it !== price)
      : [...selectedPrices, price];
    setSelectedPrices(updatedPrices);
    setParamDebounced(updatedPrices);
  };

  return (
    <>
      <ul>
        {Object.keys(priceVariants).map(priceVariant => (
          <li key={priceVariant} className="w-[280px] md:w-[300px]">
            <CheckBox
              name={priceVariant}
              value={priceVariant}
              checked={selectedPrices.includes(priceVariant)}
              onChange={() => onChange(priceVariant)}
              text={priceVariants[priceVariant]}
            />
          </li>
        ))}
      </ul>
      <ClearFilterButton
        clear={() => {
          priceParam.remove();
          setSelectedPrices([]);
        }}
      />
    </>
  );
}

PricesList.propTypes = {
  pricesInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function PriceFilter({ searchParams }) {
  const pricesInUrl = searchParams.getAll('price') || [];

  return (
    <FilterBase filterText="Ціна" count={pricesInUrl.length}>
      <PricesList pricesInUrl={pricesInUrl} />
    </FilterBase>
  );
}

PriceFilter.propTypes = {
  searchParams: PropTypes.object.isRequired,
}