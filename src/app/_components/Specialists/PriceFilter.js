'use client';

import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { specialistFiltersConfig } from '@components/Specialists/Filters/utils';

const priceVariants = {
  notSpecified: 'Не зазначено',
  free: 'Безкоштовно',
  below500: 'до 500 грн',
  from500to1000: '500-1000 грн',
  from1000to1500: '1000-1500 грн',
  above1500: 'більше 1500 грн',
};

function PricesList({ pricesInUrl }) {
  const [selectedPrices, setSelectedPrices] = useState(pricesInUrl);

  const { add, remove } = useSetParam(specialistFiltersConfig.price.filterKey.price);

  const onChange = price => {
    if (selectedPrices.includes(price)) {
      remove(price);
    } else {
      add(price);
    }
  };

  useEffect(() => {
    setSelectedPrices(pricesInUrl);
  }, [pricesInUrl]);

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
          remove();
        }}
      />
    </>
  );
}

PricesList.propTypes = {
  pricesInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function PriceFilter() {
  const pricesInUrl = useSearchParams().getAll(specialistFiltersConfig.price.filterKey.price);

  return (
    <FilterBase filterText="Ціна" count={pricesInUrl?.length || 0}>
      <PricesList pricesInUrl={pricesInUrl} />
    </FilterBase>
  );
}
