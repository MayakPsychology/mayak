'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';

const priceVariants = {
  'Не зазначено': 'notSpecified',
  Безкоштовно: 'free',
  'до 500 грн': 'below500',
  '500-1000 грн': 'from500to1000',
  '1000-1500 грн': 'from1000to1500',
  'більше 1500 грн': 'above1500',
};

function PricesList({ setCount, defaultValue }) {
  const [selectedPrices, setSelectedPrices] = useState(defaultValue);

  const { add, remove } = useSetParam('price');

  const onChange = price => {
    const priceEncoded = priceVariants[price];
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(selPrice => selPrice !== price));
      setCount(count => count - 1);
      remove(priceEncoded);
    } else {
      setSelectedPrices([...selectedPrices, price]);
      setCount(count => count + 1);
      add(priceEncoded);
    }
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
              text={priceVariant}
            />
          </li>
        ))}
      </ul>
      <ClearFilterButton
        clear={() => {
          setSelectedPrices([]);
          setCount(0);
          remove();
        }}
      />
    </>
  );
}

export function PriceFilter() {
  const priceInUrl = useSearchParams().getAll('price');
  const [count, setCount] = useState(priceInUrl.length);
  return (
    <FilterBase filterText="Ціна" count={count}>
      <PricesList
        setCount={setCount}
        defaultValue={Object.keys(priceVariants).filter(key => priceInUrl.includes(priceVariants[key]))}
      />
    </FilterBase>
  );
}

PricesList.propTypes = {
  setCount: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
};
