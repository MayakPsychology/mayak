'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { searchSyncKey, useSearchSync, useDebounce } from '@/app/_hooks';
import { SEARCH_DEBOUNCE_TIME_MS, SEARCH_MIN_QUERY_LENGTH, getSearchTypeConfig, searchInputTypeEnum } from './config';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get('searchType');
  const [query, setQuery] = useState(queryParam || '');
  const [searchType, setSearchType] = useState(searchTypeParam || '');
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const currentConfig = useMemo(() => getSearchTypeConfig(searchType), [searchType]);
  const { searchType: currentSearchType } = currentConfig;

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_TIME_MS);
  const { data: autoCompleteItems, isLoading: isAutoCompleteLoading } = useSearchSync(
    debouncedQuery,
    currentSearchType,
    SEARCH_MIN_QUERY_LENGTH,
  );

  const queryClient = useQueryClient();
  const router = useRouter();

  function submitSearch() {
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });
    router.push(`/specialist?searchType=${currentSearchType}&query=${query}`);
  }
  function navigateToAutoCompleteItem(autoCompleteItem) {
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });
    if (currentSearchType === searchInputTypeEnum.REQUEST) {
      router.push(`/specialist?searchType=${searchInputTypeEnum.REQUEST}&query=${autoCompleteItem.title}`);
    } else if (
      currentSearchType === searchInputTypeEnum.SPECIALIST ||
      currentSearchType === searchInputTypeEnum.ORGANIZATION
    ) {
      router.push(`/specialist/${autoCompleteItem.id}?type=${currentSearchType}`);
    }
  }

  useEffect(() => {
    setQuery(queryParam || '');
  }, [queryParam]);

  useEffect(() => {
    setSearchType(searchTypeParam || '');
  }, [searchTypeParam]);

  return (
    <SearchContext.Provider
      value={{
        currentConfig,
        query,
        debouncedQuery,
        searchType,
        isSelectTypeOpen,
        isAutoCompleteOpen,
        isInputFocused,
        autoCompleteItems,
        isAutoCompleteLoading,
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
  if (context === undefined) throw new Error('SearchContext is used outside of provider');
  return context;
}

SearchProvider.propTypes = {
  children: PropTypes.node,
};
