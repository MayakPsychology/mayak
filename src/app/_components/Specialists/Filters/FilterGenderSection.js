import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';

export default function FilterGenderSection({ className, filters, setFilter }) {
  const value = filters.get(specialistFiltersConfig.gender.filterKey);
  return (
    <FilterSection title={specialistFiltersConfig.gender.title} className={className}>
      <ul className="flex flex-col gap-y-1 md:flex-row">
        {specialistFiltersConfig.gender.options.map(option => (
          <li key={option.value} className="md:w-1/3">
            <CheckBox
              name="gender"
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => setFilter(specialistFiltersConfig.gender.filterKey, option.value)}
              text={option.label}
              classNames={{ labelText: 'text-p3' }}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

FilterGenderSection.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.object,
  setFilter: PropTypes.func,
};
