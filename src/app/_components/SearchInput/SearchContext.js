'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { specialistFiltersConfig, specialistTypeEnum } from '@components/Specialists/Filters/utils';
import { searchSyncKey, useDebounce, useSearchSync } from '@/app/_hooks';
import { getSpecialistURL } from '../Specialists/utils';
import { getSearchTypeConfig, SEARCH_DEBOUNCE_TIME_MS, SEARCH_MIN_QUERY_LENGTH } from './config';

const SearchContext = createContext({
  clearQuery: () => {},
  currentConfig: {},
  query: '',
  debouncedQuery: '',
  searchType: '',
  selectedTags: [],
  isSelectTypeOpen: false,
  isAutoCompleteOpen: false,
  isInputFocused: false,
  autoCompleteItems: [],
  isAutoCompleteLoading: false,
  setSelectedTags: () => {},
  addTags: () => {},
  removeTags: () => {},
  clearTags: () => {},
  setQuery: () => {},
  setSearchType: () => {},
  setIsSelectTypeOpen: () => {},
  setIsAutoCompleteOpen: () => {},
  setIsInputFocused: () => {},
  submitSearch: () => {},
  navigateToAutoCompleteItem: () => {},
});

export function SearchProvider({ children }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get(specialistFiltersConfig.specialistType.filterKey);
  const mode = searchParams.get('mode');
  const [query, setQuery] = useState(queryParam || '');
  const [searchType, setSearchType] = useState(searchTypeParam || '');
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const queryClient = useQueryClient();
  const router = useRouter();

  function addTags(item) {
    setSelectedTags(prev => {
      const exsist = prev.some(tag => tag.id === item.id);
      return exsist ? prev : [...prev, { id: item.id, title: item.title }];
    });
    setQuery('');
    setIsAutoCompleteOpen(false);
  }

  function removeTags(id) {
    setSelectedTags(prev => {
      const updated = prev.filter(tag => tag.id !== id);

      const newQuery = updated.map(t => t.title).join(', ');

      const newSearchParams = new URLSearchParams(searchParams);

      if (newQuery.length > 0) {
        newSearchParams.set('query', newQuery);
      } else {
        newSearchParams.delete('query');
      }

      router.replace(`/specialist?${newSearchParams.toString()}`);

      return updated;
    });
  }

  function clearTags() {
    setSelectedTags([]);
  }

  const currentConfig = useMemo(() => getSearchTypeConfig(searchType), [searchType]);
  const { searchType: currentSearchType } = currentConfig;

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_TIME_MS);
  const { data: autoCompleteItems, isLoading: isAutoCompleteLoading } = useSearchSync(
    debouncedQuery,
    currentSearchType,
    SEARCH_MIN_QUERY_LENGTH,
  );

  function submitSearch() {
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });

    const newSearchParams = new URLSearchParams(searchParams);

    const tagTitles = selectedTags.map(tag => tag.title);
    const textPart = query.trim();

    const combinedQuery = [...tagTitles, textPart].filter(Boolean).join(', ');

    if (combinedQuery.length > 0) {
      newSearchParams.set('query', combinedQuery);
    } else {
      newSearchParams.delete('query');
    }

    newSearchParams.set(specialistFiltersConfig.specialistType.filterKey, currentSearchType);

    if (mode) {
      newSearchParams.set('mode', 'map');
    } else {
      newSearchParams.delete('mode');
    }

    router.push(`/specialist?${newSearchParams.toString()}`);
  }

  function navigateToAutoCompleteItem(autoCompleteItem) {
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });
    if (currentSearchType === specialistTypeEnum.REQUEST) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(specialistFiltersConfig.specialistType.filterKey, specialistTypeEnum.REQUEST);
      newSearchParams.set('query', autoCompleteItem.title);
      router.replace(`/specialist?${newSearchParams.toString()}`);
    } else if (
      currentSearchType === specialistTypeEnum.SPECIALIST ||
      currentSearchType === specialistTypeEnum.ORGANIZATION
    ) {
      router.replace(getSpecialistURL({ type: currentSearchType, id: autoCompleteItem.id }));
    }
  }

  function clearQuery() {
    setQuery('');
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('query');
    newSearchParams.delete(specialistFiltersConfig.specialistType.filterKey);
    router.replace(`/specialist?${newSearchParams.toString()}`);
  }

  useEffect(() => {
    if (!queryParam) {
      setSelectedTags([]);
      setQuery('');
      return;
    }

    const tagTitles = queryParam
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    setSelectedTags(tagTitles.map(title => ({ id: title, title })));

    setQuery('');
  }, [queryParam]);

  useEffect(() => {
    setSearchType(searchTypeParam || '');
  }, [searchTypeParam]);

  return (
    <SearchContext.Provider
      value={{
        clearQuery,
        currentConfig,
        query,
        debouncedQuery,
        searchType,
        isSelectTypeOpen,
        isAutoCompleteOpen,
        isInputFocused,
        autoCompleteItems,
        isAutoCompleteLoading,
        selectedTags,
        clearTags,
        addTags,
        removeTags,
        setQuery,
        setSearchType,
        setIsSelectTypeOpen,
        setIsAutoCompleteOpen,
        setIsInputFocused,
        submitSearch,
        navigateToAutoCompleteItem,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) console.error('SearchContext is used outside of provider');
  return context;
}

SearchProvider.propTypes = {
  children: PropTypes.node,
};
