import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';
import { cityFilterPropType } from './propTypes';

export default function FilterCitySection({ className, cities, filters, appendFilter }) {
  const value = filters.getAll(specialistFiltersConfig.city.filterKey);
  return (
    <FilterSection title={specialistFiltersConfig.city.title} className={className}>
      <ul className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:gap-y-2">
        {cities.map(city => (
          <li key={city.id} className="w-1/3">
            <CheckBox
              name="city"
              value={city.id}
              checked={value.includes(city.id)}
              onChange={() => appendFilter(specialistFiltersConfig.city.filterKey, city.id)}
              text={city.name}
              classNames={{ labelText: 'text-p3' }}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

FilterCitySection.propTypes = {
  className: PropTypes.string,
  cities: PropTypes.arrayOf(cityFilterPropType),
  filters: PropTypes.object,
  appendFilter: PropTypes.func,
};
