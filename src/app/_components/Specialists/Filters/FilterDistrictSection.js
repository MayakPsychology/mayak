import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';
import { districtFilterPropType } from './propTypes';

export default function FilterDistrictSection({ className, districts, filters, appendFilter }) {
  const value = filters.getAll(specialistFiltersConfig.district.filterKey);
  return (
    <FilterSection title={specialistFiltersConfig.district.title} titleInfo="м. Львів" className={className}>
      <ul className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:gap-y-2">
        {districts.map(district => (
          <li key={district.id} className="w-1/3">
            <CheckBox
              name="district"
              value={district.id}
              checked={value.includes(district.id)}
              onChange={() => appendFilter(specialistFiltersConfig.district.filterKey, district.id)}
              text={district.name}
              classNames={{ labelText: 'text-p3' }}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

FilterDistrictSection.propTypes = {
  className: PropTypes.string,
  districts: PropTypes.arrayOf(districtFilterPropType),
  filters: PropTypes.object,
  appendFilter: PropTypes.func,
};
