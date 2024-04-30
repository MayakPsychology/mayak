import { Settings as SettingsIcon } from '@icons/index';
import { FilterChip } from '@components/FilterChip';
import AllFiltersModal from '@components/Specialists/Filters/AllFiltersModal';
import PropTypes from 'prop-types';
import { FilterChipCounter } from '@components/FilterChipCounter';
import useToggleState from '@/app/_hooks/useToggleState';
import { filterDataPropTypes } from './propTypes';
import { countAppliedFilters, priceTypeEnum, specialistFiltersConfig } from './utils';

export function AllFilters({ filterData, searchParams }) {
  const [isOpen, { open, close }] = useToggleState(false);

  const filtersAppliedCount = countAppliedFilters(
    Object.values(specialistFiltersConfig).map(({ filterKey }) => filterKey),
    searchParams,
    {
      filter: (key, value) =>
        key === specialistFiltersConfig.price.filterKey.price ? value.filter(v => v === priceTypeEnum.FREE) : value,
    },
  );

  return (
    <>
      <button className="flex items-center gap-2 md:hidden relative" onClick={open}>
        <SettingsIcon />
        <FilterChipCounter count={filtersAppliedCount} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2" />
      </button>
      <div className="max-md:hidden">
        <FilterChip opened={isOpen} text="Усі фільтри" count={filtersAppliedCount} onClick={open} />
      </div>
      <AllFiltersModal filterData={filterData} isOpen={isOpen} onClose={close} />
    </>
  );
}

AllFilters.propTypes = {
  filterData: filterDataPropTypes,
  searchParams: PropTypes.object.isRequired,
};
