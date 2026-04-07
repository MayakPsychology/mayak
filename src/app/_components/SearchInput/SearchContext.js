'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { specialistFiltersConfig, specialistTypeEnum } from '@components/Specialists/Filters/utils';
import { searchSyncKey, useDebounce, useSearchSync } from '@/app/_hooks';
import { getSpecialistURL } from '../Specialists/utils';
import { getSearchTypeConfig, SEARCH_DEBOUNCE_TIME_MS, SEARCH_MIN_QUERY_LENGTH } from './config';

const SearchContext = createContext({});

export function SearchProvider({ children }) {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query');
  const tagsParam = searchParams.get('tags');
  const searchTypeParam = searchParams.get(specialistFiltersConfig.specialistType.filterKey);
  const mode = searchParams.get('mode');

  const router = useRouter();
  const queryClient = useQueryClient();

  const [query, setQuery] = useState('');
  const [textTag, setTextTag] = useState(null);
  const [searchType, setSearchType] = useState(searchTypeParam || '');
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const pathname = usePathname();
  const isSpecialistPage = pathname.startsWith('/specialist');

  function addTags(item) {
    setSelectedTags(prev => {
      const exists = prev.some(tag => tag.title === item.title);
      if (exists) return prev;

      const newTags = [...prev, { id: item.id, title: item.title }];

      // 🔥 тільки якщо ми на search page
      if (isSpecialistPage) {
        const newParams = new URLSearchParams(searchParams);

        newParams.set('tags', JSON.stringify(newTags.map(t => t.title)));

        router.replace(`/specialist?${newParams.toString()}`);
      }

      return newTags;
    });

    setQuery('');
    setIsAutoCompleteOpen(false);
  }

  function removeTags(id) {
    setSelectedTags(prev => {
      const newTags = prev.filter(tag => tag.id !== id);

      if (isSpecialistPage) {
        const newParams = new URLSearchParams(searchParams);

        if (newTags.length > 0) {
          newParams.set('tags', JSON.stringify(newTags.map(t => t.title)));
        } else {
          newParams.delete('tags');
        }

        router.replace(`/specialist?${newParams.toString()}`);
      }

      return newTags;
    });
  }

  function clearTags() {
    setSelectedTags([]);
  }

  function clearTextTag() {
    setTextTag(() => {
      if (isSpecialistPage) {
        const newParams = new URLSearchParams(searchParams);

        newParams.delete('query');

        router.replace(`/specialist?${newParams.toString()}`);
      }

      return null;
    });
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

    const newParams = new URLSearchParams(searchParams);

    const tagTitles = selectedTags.map(tag => tag.title);
    const textPart = query.trim();

    if (textPart) {
      setTextTag(textPart);
      newParams.set('query', textPart);
    }

    if (tagTitles.length > 0) {
      newParams.set('tags', JSON.stringify(tagTitles));
    } else {
      newParams.delete('tags');
    }

    newParams.set(specialistFiltersConfig.specialistType.filterKey, currentSearchType);

    if (mode) newParams.set('mode', 'map');
    else newParams.delete('mode');

    router.push(`/specialist?${newParams.toString()}`);

    setQuery('');
  }

  function navigateToAutoCompleteItem(autoCompleteItem) {
    setIsAutoCompleteOpen(false);
    queryClient.cancelQueries({ queryKey: searchSyncKey });

    //  if (!isSpecialistPage) {
    //   setSelectedTags(autoCompleteItem); // просто в інпут
    //   return;
    // }

    if (currentSearchType === specialistTypeEnum.REQUEST) {
      // 🔥 завжди через addTags
      addTags(autoCompleteItem);
      return;
    }

    if (currentSearchType === specialistTypeEnum.SPECIALIST || currentSearchType === specialistTypeEnum.ORGANIZATION) {
      setQuery(autoCompleteItem.title);
      const url = getSpecialistURL({
        type: currentSearchType,
        id: autoCompleteItem.id,
      });
      router.push(url);
    }
  }

  function handleSearchTypeChange(type) {
    if (type === searchType) return;

    setSearchType(type);
    setQuery('');
    setSelectedTags([]);
    setTextTag(null);
    setIsAutoCompleteOpen(false);

    queryClient.cancelQueries({ queryKey: searchSyncKey });

    if (!isSpecialistPage) return;

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('query');
    newParams.delete('tags');
    newParams.set(specialistFiltersConfig.specialistType.filterKey, type);

    router.replace(`/specialist?${newParams.toString()}`);
  }

  function clearQuery() {
    setQuery('');
    setSelectedTags([]);
    setTextTag(null);
    setIsAutoCompleteOpen(false);

    queryClient.cancelQueries({ queryKey: searchSyncKey });

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('query');
    newParams.delete('tags');
    newParams.delete(specialistFiltersConfig.specialistType.filterKey);

    router.replace(`/specialist?${newParams.toString()}`);
  }

  useEffect(() => {
    let parsedTags = [];

    if (tagsParam) {
      try {
        parsedTags = JSON.parse(tagsParam);
      } catch {
        parsedTags = [];
      }
    }

    const newTags = parsedTags.map(title => ({ id: title, title }));

    const prev = selectedTags.map(t => t.title).join(',');
    const next = parsedTags.join(',');

    if (prev !== next) {
      setSelectedTags(newTags);
    }

    if (queryParam) {
      setTextTag(queryParam);
      setQuery('');
    } else {
      setTextTag(null);
    }
  }, [tagsParam, queryParam]);

  useEffect(() => {
    if (!searchTypeParam) return;
    if (searchTypeParam !== searchType) {
      setSearchType(searchTypeParam);
    }
  }, [searchTypeParam, searchType]);

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
        textTag,

        clearTags,
        clearTextTag,
        addTags,
        removeTags,
        setQuery,
        setSearchType,
        handleSearchTypeChange,
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
