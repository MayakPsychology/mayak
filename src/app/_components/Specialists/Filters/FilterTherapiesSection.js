import {
  TherapyFilterIndividual,
  TherapyFilterBusiness,
  TherapyFilterCouple,
  TherapyFilterFamily,
  TherapyFilterGroup,
  TherapyFilterKids,
} from '@icons';
import PropTypes from 'prop-types';
import FilterIconCard from '@components/Specialists/Filters/FilterIconCard';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { specialistFiltersConfig } from './utils';
import { therapyFilterPropType } from './propTypes';

const mapTherapyIcon = {
  individual: <TherapyFilterIndividual />,
  business: <TherapyFilterBusiness />,
  pair: <TherapyFilterCouple />,
  family: <TherapyFilterFamily />,
  group: <TherapyFilterGroup />,
  kids: <TherapyFilterKids />,
};
export default function FilterTherapiesSection({ className, therapies, filters, setFilter }) {
  const value = filters.getAll(specialistFiltersConfig.type.filterKey);

  return (
    <FilterSection title={specialistFiltersConfig.type.title} className={className}>
      <div className="grid grid-cols-2 gap-3 px-2.5 md:grid-cols-3 md:px-0">
        {therapies.map(therapy => (
          <FilterIconCard
            key={therapy.id}
            value={therapy.id}
            title={therapy.title}
            icon={mapTherapyIcon[therapy.type]}
            selected={value.includes(therapy.type)}
            onClick={() => setFilter(specialistFiltersConfig.type.filterKey, therapy.type)}
          />
        ))}
      </div>
    </FilterSection>
  );
}

FilterTherapiesSection.propTypes = {
  className: PropTypes.string,
  therapies: PropTypes.arrayOf(therapyFilterPropType),
  filters: PropTypes.object,
  setFilter: PropTypes.func,
};
