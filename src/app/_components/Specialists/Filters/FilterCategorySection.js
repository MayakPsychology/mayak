import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';
import { categoryFilterPropType } from './propTypes';

export default function FilterCategorySection({ className, categories, filters, appendFilter }) {
  const value = filters.getAll(specialistFiltersConfig.category.filterKey);
  return (
    <FilterSection title={specialistFiltersConfig.category.title} className={className}>
      <ul className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:items-center">
        {categories.map(category => (
          <li key={category.id} className="md:w-1/3">
            <CheckBox
              name="category"
              value={category.id}
              checked={value.includes(category.id)}
              onChange={() => appendFilter(specialistFiltersConfig.category.filterKey, category.id)}
              text={category.name}
              classNames={{ labelText: 'text-p3' }}
            />
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}

FilterCategorySection.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.arrayOf(categoryFilterPropType),
  filters: PropTypes.object,
  appendFilter: PropTypes.func,
};
