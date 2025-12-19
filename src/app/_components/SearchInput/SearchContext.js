'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { specialistFiltersConfig, specialistTypeEnum } from '@components/Specialists/Filters/utils';
import { searchSyncKey, useDebounce, useSearchSync } from '@/app/_hooks';
import { getSpecialistURL } from '../Specialists/utils';
import { getSearchTypeConfig, SEARCH_DEBOUNCE_TIME_MS, SEARCH_MIN_QUERY_LENGTH } from './config';

const SearchContext = createContext({});

export function SearchProvider({ children }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get(specialistFiltersConfig.specialistType.filterKey);
  const mode = searchParams.get('mode');
  const router = useRouter();
  const queryClient = useQueryClient();

  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState(searchTypeParam || '');
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  function addTags(item) {
    setSelectedTags(prev => {
      const exists = prev.some(tag => tag.title === item.title);
      return exists ? prev : [...prev, { id: item.id, title: item.title }];
    });
    setQuery('');
    setIsAutoCompleteOpen(false);
  }

  function removeTags(id) {
    setSelectedTags(prev => prev.filter(tag => tag.id !== id));
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

    const tagTitles = selectedTags.map(tag => tag.title);
    const textPart = query.trim();
    const combinedQuery = [...tagTitles, textPart].filter(Boolean).join(', ');

    const newParams = new URLSearchParams(searchParams);

    if (combinedQuery.length > 0) {
      newParams.set('query', combinedQuery);
    } else {
      newParams.delete('query');
    }

    newParams.set(specialistFiltersConfig.specialistType.filterKey, currentSearchType);

    if (mode) {
      newParams.set('mode', 'map');
    } else {
      newParams.delete('mode');
    }

    router.push(`/specialist?${newParams.toString()}`);
  }

  function navigateToAutoCompleteItem(autoCompleteItem) {
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });

    if (currentSearchType === specialistTypeEnum.REQUEST) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(specialistFiltersConfig.specialistType.filterKey, specialistTypeEnum.REQUEST);
      newParams.set('query', autoCompleteItem.title);

      setTimeout(() => {
        router.replace(`/specialist?${newParams.toString()}`);
      }, 0);

      return;
    }

    if (currentSearchType === specialistTypeEnum.SPECIALIST || currentSearchType === specialistTypeEnum.ORGANIZATION) {
      const url = getSpecialistURL({ type: currentSearchType, id: autoCompleteItem.id });

      setTimeout(() => {
        router.replace(url);
      }, 0);
    }
  }

  function clearQuery() {
    setQuery('');
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });

    const newParams = new URLSearchParams(searchParams);
    newParams.delete('query');
    newParams.delete(specialistFiltersConfig.specialistType.filterKey);

    router.replace(`/specialist?${newParams.toString()}`);
  }

  useEffect(() => {
    if (queryParam === null) return;
    if (queryParam === '') {
      if (selectedTags.length > 0) setSelectedTags([]);
      return;
    }
    const tagTitles = [
      ...new Set(
        queryParam
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
      ),
    ];

    const prevTitles = selectedTags
      .map(t => t.title)
      .sort()
      .join(',');
    const newTitles = tagTitles.sort().join(',');

    if (prevTitles === newTitles) return;

    setSelectedTags(tagTitles.map(title => ({ id: title, title })));
  }, [queryParam]);

  useEffect(() => {
    if (searchType !== specialistTypeEnum.REQUEST && selectedTags.length > 0) {
      setSelectedTags([]);
    }
  }, [searchType]);

  useEffect(() => {
    const tagTitles = selectedTags.map(tag => tag.title);
    const newQuery = tagTitles.join(', ');

    const newParams = new URLSearchParams(searchParams);

    if (newQuery) newParams.set('query', newQuery);
    else newParams.delete('query');

    const next = newParams.toString();
    const current = searchParams.toString();

    if (next === current) return;

    setTimeout(() => {
      router.replace(`/specialist?${next}`);
    }, 0);
  }, [selectedTags]);

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
