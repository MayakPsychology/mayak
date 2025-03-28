import { CloseIcon } from '@icons/index';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { PillButton } from '@components/PillButton';
import { Heading } from '@components/Typography';
import Tabs from '@components/Tabs';
import { getProperEndingWithBase } from '@components/Specialists//utils';
import FilterRequestsSection from '@components/Specialists/Filters/FilterRequestsSection';
import FilterCategorySection from '@components/Specialists/Filters/FilterCategorySection';
import FilterGenderSection from '@components/Specialists/Filters/FilterGenderSection';
import FilterFormatSection from '@components/Specialists/Filters/FilterFormatSection';
import FilterPriceSection from '@components/Specialists/Filters/FilterPriceSection';
import FilterDistrictSection from '@components/Specialists/Filters/FilterDistrictSection';
import FilterTherapiesSection from '@components/Specialists/Filters/FilterTherapiesSection';
import ScrollableList from '@components/Specialists/Filters/ScrollableList';
import FilterOrganizationTypeSection from '@components/Specialists/Filters/FilterOrganizationTypeSection';
import { cn } from '@/utils/cn';
import { useDebounce, useListEntriesCount } from '@/app/_hooks';
import { filterDataPropTypes } from './propTypes';
import {
  getInitialFilters,
  processFiltersBeforeApply,
  specialistFiltersConfig,
  specialistTypeEnum,
  specialistFormatEnum,
} from './utils';

export default function AllFiltersModalContent({ onClose, filterData }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const initialSearchParamsRef = useRef(searchParams);
  const [filters, setFilters] = useState(getInitialFilters(searchParams));

  const filtersToApply = useMemo(() => processFiltersBeforeApply(filters), [filters]);
  const debouncedFilters = useDebounce(filtersToApply, 500);
  const { data } = useListEntriesCount(debouncedFilters);
  const totalCount = data?.data?.count;

  const onNewFilterAdded = (key, value, newFilters) => {
    if (key === specialistFiltersConfig.type.filterKey) {
      newFilters.delete(specialistFiltersConfig.request.filterKey);
    }
    if (key === specialistFiltersConfig.specialistType.filterKey && value !== specialistTypeEnum.ORGANIZATION) {
      newFilters.delete(specialistFiltersConfig.organizationType.filterKey);
    }
    return newFilters;
  };
  const appendFilter = useCallback((key, value) => {
    setFilters(oldFilters => {
      const newFilters = new URLSearchParams(oldFilters);
      if (newFilters.has(key, value)) {
        newFilters.delete(key, value);
      } else {
        newFilters.append(key, value);
      }
      return onNewFilterAdded(key, value, newFilters);
    });
  }, []);

  const setFilter = useCallback((key, value) => {
    setFilters(oldFilters => {
      const newFilters = new URLSearchParams(oldFilters);
      if (value == null) {
        newFilters.delete(key);
      } else {
        newFilters.set(key, value);
      }
      return onNewFilterAdded(key, value, newFilters);
    });
  }, []);

  const toggleFilter = useCallback((key, value) => {
    setFilters(oldFilters => {
      const newFilters = new URLSearchParams(oldFilters);
      if (newFilters.has(key, value)) {
        newFilters.delete(key, value);
      } else {
        newFilters.set(key, value);
      }
      return onNewFilterAdded(key, value, newFilters);
    });
  }, []);

  const applyFiltersToURL = filtersToApplyToURL => {
    if (searchParams.toString() === filtersToApplyToURL.toString()) {
      onClose();
    } else {
      setIsLoading(true);
      router.push(`${pathname}?${filtersToApplyToURL}`);
    }
  };

  const apply = () => {
    applyFiltersToURL(processFiltersBeforeApply(filters));
  };

  const reset = () => {
    const resetURLSearch = new URLSearchParams(searchParams);
    Object.values(specialistFiltersConfig).forEach(({ filterKey }) => {
      if (typeof filterKey === 'object') {
        Object.values(filterKey).forEach(key => {
          resetURLSearch.delete(key);
        });
        return;
      }
      resetURLSearch.delete(filterKey);
    });
    applyFiltersToURL(resetURLSearch);
  };

  useEffect(() => {
    if (searchParams.toString() !== initialSearchParamsRef.current.toString()) {
      onClose();
    }
  }, [searchParams, onClose]);

  const selectedTherapyKey = filters.get(specialistFiltersConfig.type.filterKey);
  const selectedTherapy = filterData.therapies.find(therapy => therapy.type === selectedTherapyKey);
  const requests = selectedTherapy?.requests || [];

  const isOrganization = useMemo(() => {
    const selectedSpecialistType = filters.get(specialistFiltersConfig.specialistType.filterKey);
    return selectedSpecialistType === specialistTypeEnum.ORGANIZATION;
  }, [filters]);

  const isOnlyOnlineFormat = useMemo(() => {
    const format = filters.getAll(specialistFiltersConfig.format.filterKey);
    return format.toString() === specialistFormatEnum.ONLINE;
  }, [filters]);

  const hasDistrictFilter = useMemo(() => isOrganization || !isOnlyOnlineFormat, [isOrganization, isOnlyOnlineFormat]);

  useEffect(() => {
    if (!hasDistrictFilter) {
      setFilter(specialistFiltersConfig.district.filterKey, null);
    }
  }, [hasDistrictFilter, setFilter]);

  return (
    <>
      <div className="flex w-full flex-none items-center justify-between px-4 md:relative md:px-6">
        <Heading type="h4" className="flex-1 text-center text-p2 font-bold text-gray-900">
          Фільтри
        </Heading>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center text-gray-700 md:absolute md:right-4 md:top-0"
        >
          <CloseIcon />
        </button>
      </div>
      <ScrollableList
        key="scrollList"
        className="w-full min-w-0 my-4 flex h-full flex-1 flex-col gap-5 border-b border-t border-gray-300 py-5 md:mt-[26px] md:gap-3 md:px-6 md:py-4"
      >
        <div className="px-4 md:px-0">
          <Tabs
            options={specialistFiltersConfig.specialistType.options}
            value={filters.get(specialistFiltersConfig.specialistType.filterKey)}
            onChange={activeTab => setFilter(specialistFiltersConfig.specialistType.filterKey, activeTab)}
          />
        </div>
        <FilterTherapiesSection
          className="px-4 md:mt-1 md:px-0"
          therapies={filterData.therapies}
          filters={filters}
          setFilter={toggleFilter}
        />
        {!!requests.length && (
          <FilterRequestsSection
            className="px-4 md:px-0"
            requests={requests}
            filters={filters}
            appendFilter={appendFilter}
          />
        )}
        {hasDistrictFilter && (
          <FilterDistrictSection
            className="px-4 md:px-0"
            districts={filterData.districts}
            filters={filters}
            appendFilter={appendFilter}
          />
        )}
        <FilterPriceSection
          className="px-4 md:px-0"
          filters={filters}
          setFilter={setFilter}
          toggleFilter={toggleFilter}
        />
        <FilterFormatSection className="px-4 md:px-0" filters={filters} appendFilter={appendFilter} />
        {!isOrganization && <FilterGenderSection className="px-4 md:px-0" filters={filters} setFilter={setFilter} />}
        <FilterCategorySection
          className={cn('px-4 md:px-0', {
            'border-none pb-0': !isOrganization,
          })}
          categories={filterData.categories}
          filters={filters}
          appendFilter={appendFilter}
        />
        {isOrganization && (
          <FilterOrganizationTypeSection
            className="border-none px-4 pb-0 md:px-0"
            filters={filters}
            setFilter={setFilter}
          />
        )}
      </ScrollableList>
      <div className="flex w-full flex-none items-center justify-between gap-2 px-4 md:px-6">
        <PillButton
          disabled={isLoading}
          variant="outlined"
          colorVariant="blue"
          aria-label="Очистити фільтри"
          onClick={reset}
        >
          Очистити<span className="max-md:hidden"> все</span>
        </PillButton>
        <PillButton
          disabled={isLoading}
          variant="filled"
          colorVariant="blue"
          aria-label="Показати результати"
          className="text-p4"
          onClick={apply}
        >
          Показати{' '}
          {!!totalCount && (
            <>
              {totalCount} <span className="max-md:hidden"> {getProperEndingWithBase('варіант', totalCount)}</span>
            </>
          )}
        </PillButton>
      </div>
    </>
  );
}

AllFiltersModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  filterData: filterDataPropTypes,
  searchParams: PropTypes.object,
};
