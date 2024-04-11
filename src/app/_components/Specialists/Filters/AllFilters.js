import { Settings as SettingsIcon } from '@icons/index';
import { useSearchParams } from 'next/navigation';
import { FilterChip } from '@components/FilterChip';
import AllFiltersModal from '@components/Specialists/Filters/AllFiltersModal';
import useToggleState from '@/app/_hooks/useToggleState';
import { filterDataPropTypes } from './propTypes';
import { countAppliedFilters, specialistFiltersConfig } from './utils';

export function AllFilters({ filterData }) {
  const [isOpen, { open, close }] = useToggleState(false);

  const searchParams = useSearchParams();
  const filtersAppliedCount = countAppliedFilters(
    Object.values(specialistFiltersConfig).map(({ filterKey }) => filterKey),
    searchParams,
  );

  return (
    <>
      <button className="flex items-center gap-2 md:hidden" onClick={open}>
        <SettingsIcon />
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
};
