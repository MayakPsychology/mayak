'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListCity, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useDebounceCallback } from '@/app/_hooks';
import { INPUT_DEBOUNCE } from '@/lib/consts';

function CityList({ citiesInUrl }) {
  const cityParam = useSetParam('city');
  const districtParam = useSetParam('district');
  const [selectedCities, setSelectedCities] = useState(citiesInUrl);
  const { data: cityList, isLoading } = useListCity();

  const setParamDebounced = useDebounceCallback(cities => {
    cityParam.replace(cities);
  }, INPUT_DEBOUNCE);

  const onChange = city => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(it => it !== city)
      : [...selectedCities, city];
    setSelectedCities(updatedCities);
    setParamDebounced(updatedCities);
    // districts belong to a city; keeping stale ones would filter everything away
    districtParam.remove();
  };

  useEffect(() => {
    setSelectedCities(citiesInUrl);
  }, [citiesInUrl]);

  if (isLoading) return <CircularProgress />;

  if (!cityList?.length) return null;

  return (
    <>
      <ul>
        {cityList.map(({ id, name }) => (
          <li key={id} className="w-[280px] md:w-[300px]">
            <CheckBox
              name={id}
              value={id}
              checked={selectedCities?.includes(id)}
              onChange={() => onChange(id)}
              text={name}
            />
          </li>
        ))}
      </ul>
      <ClearFilterButton
        clear={() => {
          cityParam.remove();
          districtParam.remove();
          setSelectedCities([]);
        }}
      />
    </>
  );
}

CityList.propTypes = {
  citiesInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function CityFilter({ searchParams }) {
  const citiesInUrl = searchParams.getAll('city') || [];

  return (
    <FilterBase filterText="Місто" count={citiesInUrl.length}>
      <CityList citiesInUrl={citiesInUrl} />
    </FilterBase>
  );
}

CityFilter.propTypes = {
  searchParams: PropTypes.object.isRequired,
};
