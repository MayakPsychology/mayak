import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';

export default function FilterFormatSection({ className, filters, appendFilter }) {
  const value = filters.getAll(specialistFiltersConfig.format.filterKey);
  return (
    <FilterSection title={specialistFiltersConfig.format.title} className={className}>
      <ul className="flex flex-col gap-y-1 md:flex-row">
        {specialistFiltersConfig.format.options.map(option => (
          <li key={option.value} className="md:w-1/3">
            <CheckBox
              name="format"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => appendFilter(specialistFiltersConfig.format.filterKey, option.value)}
              text={option.label}
              classNames={{ labelText: 'text-p3' }}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

FilterFormatSection.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.object,
  appendFilter: PropTypes.func,
};
