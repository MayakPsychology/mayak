import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';
import { categoryFilterPropType } from './propTypes';

export default function FilterOrganizationTypeSection({ className, filters, setFilter }) {
  const value = filters.get(specialistFiltersConfig.organizationType.filterKey);
  return (
    <FilterSection title={specialistFiltersConfig.organizationType.title} className={className}>
      <ul className="flex flex-col gap-y-1 md:flex-row">
        {specialistFiltersConfig.organizationType.options.map(option => (
          <li key={option.value} className="md:w-1/3">
            <CheckBox
              name="organizationType"
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => setFilter(specialistFiltersConfig.organizationType.filterKey, option.value)}
              text={option.label}
              classNames={{ labelText: 'text-p3' }}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

FilterOrganizationTypeSection.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.arrayOf(categoryFilterPropType),
  filters: PropTypes.object,
  setFilter: PropTypes.func,
};
