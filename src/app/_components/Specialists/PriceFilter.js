'use client';

import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';

const priceVariants = {
  notSpecified: 'Не зазначено',
  free: 'Безкоштовно',
  below500: 'до 500 грн',
  from500to1000: '500-1000 грн',
  from1000to1500: '1000-1500 грн',
  above1500: 'більше 1500 грн',
};

function PricesList() {
  const [selectedPrices, setSelectedPrices] = useState([]);

  const searchParams = useSearchParams();
  const { add, remove } = useSetParam('price');

  const onChange = price => {
    if (selectedPrices.includes(price)) {
      remove(price);
    } else {
      add(price);
    }
  };

  useEffect(() => {
    const pricesInUrl = searchParams.getAll('price');
    setSelectedPrices(pricesInUrl);
  }, [searchParams]);

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

export function PriceFilter() {
  const pricesInUrl = useSearchParams().getAll('price');

  return (
    <FilterBase filterText="Ціна" count={pricesInUrl?.length || 0}>
      <PricesList />
    </FilterBase>
  );
}
