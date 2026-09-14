'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListCity, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useDebounceCallback } from '@/app/_hooks';
import { INPUT_DEBOUNCE } from '@/lib/consts';

function DistrictList({ districtsInUrl, citiesInUrl }) {
  const districtParam = useSetParam('district');
  const [selectedDistricts, setSelectedDistricts] = useState(districtsInUrl);
  const { data: cityList, isLoading } = useListCity({ withDistricts: true });

  // Only the districts of the cities the visitor picked; a flat all-Ukraine list is unusable.
  const districtList = cityList
    ?.filter(city => citiesInUrl.includes(city.id))
    .flatMap(city => city.districts ?? []);

  const setParamDebounced = useDebounceCallback(districts => {
    districtParam.replace(districts);
  }, INPUT_DEBOUNCE);

  const onChange = district => {
    const updatedDistricts = selectedDistricts.includes(district)
      ? selectedDistricts.filter(it => it !== district)
      : [...selectedDistricts, district];
    setSelectedDistricts(updatedDistricts);
    setParamDebounced(updatedDistricts);
  };

  useEffect(() => {
    setSelectedDistricts(districtsInUrl);
  }, [districtsInUrl]);

  if (isLoading) return <CircularProgress />;

  if (!districtList?.length) return null;

  return (
    <>
      <ul>
        {districtList.map(district => {
          const { id, name } = district;
          return (
            <li key={id} className="w-[280px] md:w-[300px]">
              <CheckBox
                name={id}
                value={id}
                key={id}
                checked={selectedDistricts?.includes(id)}
                onChange={() => onChange(id)}
                text={name}
              />
            </li>
          );
        })}
      </ul>
      <ClearFilterButton
        clear={() => {
          districtParam.remove();
          setSelectedDistricts([]);
        }}
      />
    </>
  );
}

DistrictList.propTypes = {
  districtsInUrl: PropTypes.arrayOf(PropTypes.string),
  citiesInUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export function DistrictFilter({ searchParams }) {
  const districtsInUrl = searchParams.getAll('district') || [];
  const citiesInUrl = searchParams.getAll('city') || [];

  // Districts are a property of a city — there is nothing to offer until one is chosen.
  if (!citiesInUrl.length) return null;

  return (
    <FilterBase filterText="Райони" count={districtsInUrl.length}>
      <DistrictList districtsInUrl={districtsInUrl} citiesInUrl={citiesInUrl} />
    </FilterBase>
  );
}

DistrictFilter.propTypes = {
  searchParams: PropTypes.object.isRequired,
};
