'use client';

import { useEffect, useState } from 'react';
import { useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { districtFilterPropType } from '@components/Specialists/Filters/propTypes';
import { specialistFiltersConfig } from '@components/Specialists/Filters/utils';

function DistrictList({ options, districtsInUrl }) {
  const [selectedDistricts, setSelectedDistricts] = useState(districtsInUrl);

  const { add, remove } = useSetParam(specialistFiltersConfig.district.filterKey);

  const onChange = district => {
    if (selectedDistricts.includes(district)) {
      remove(district);
    } else {
      add(district);
    }
  };

  useEffect(() => {
    setSelectedDistricts(districtsInUrl);
  }, [districtsInUrl]);
  return (
    <>
      <ul>
        {options.map(district => {
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
          remove();
        }}
      />
    </>
  );
}

DistrictList.propTypes = {
  options: PropTypes.arrayOf(districtFilterPropType),
  districtsInUrl: PropTypes.arrayOf(PropTypes.string),
};

export function DistrictFilter({ options }) {
  const districtsInUrl = useSearchParams().getAll(specialistFiltersConfig.district.filterKey);

  return (
    <FilterBase filterText="Райони" count={districtsInUrl?.length || 0}>
      <DistrictList options={options} districtsInUrl={districtsInUrl} />
    </FilterBase>
  );
}

DistrictFilter.propTypes = {
  options: PropTypes.arrayOf(districtFilterPropType),
};
