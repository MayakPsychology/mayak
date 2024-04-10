'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';
import { useDebounceCallback } from '@/app/_hooks';

const priceVariants = {
  notSpecified: 'Не зазначено',
  free: 'Безкоштовно',
  below500: 'до 500 грн',
  from500to1000: '500-1000 грн',
  from1000to1500: '1000-1500 грн',
  above1500: 'більше 1500 грн',
};

function PricesList({ pricesInUrl }) {
  const priceParam = useSetParam('price');
  const [selectedPrices, setSelectedPrices] = useState(pricesInUrl);
  const setParamDebounced = useDebounceCallback(prices => {
    priceParam.replace(prices);
  }, 500);

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
        }}
      />
    </>
  );
}

PricesList.propTypes = {
  pricesInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function PriceFilter() {
  const pricesInUrl = useSearchParams().getAll('price');

  return (
    <FilterBase filterText="Ціна" count={pricesInUrl?.length || 0}>
      <PricesList pricesInUrl={pricesInUrl || []} />
    </FilterBase>
  );
}
