'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useListDistrict, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useDebounceCallback } from '@/app/_hooks';
import { INPUT_DEBOUNCE } from '@/lib/consts';

function DistrictList({ districtsInUrl }) {
  const districtParam = useSetParam('district');
  const [selectedDistricts, setSelectedDistricts] = useState(districtsInUrl);
  const { data: districtList, isLoading } = useListDistrict();

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
      <ClearFilterButton clear={() => districtParam.remove()} />
    </>
  );
}

DistrictList.propTypes = {
  districtsInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function DistrictFilter() {
  const districtsInUrl = useSearchParams().getAll('district') || [];

  return (
    <FilterBase filterText="Райони" count={districtsInUrl.length}>
      <DistrictList districtsInUrl={districtsInUrl} />
    </FilterBase>
  );
}
