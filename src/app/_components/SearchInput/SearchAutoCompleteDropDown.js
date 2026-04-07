'use client';

import { useCallback, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { specialistTypeEnum } from '../Specialists/Filters/utils';
import { OverlayContainer } from './OverlayContainer';
import { OverlayList } from './OverlayList';
import { useSearchContext } from './SearchContext';
import { SEARCH_MIN_QUERY_LENGTH } from './config';

function normalize(value = '') {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLastToken(query = '') {
  const tokens = normalize(query).split(' ');
  return tokens[tokens.length - 1] || '';
}

function matchesAutocomplete(query, title) {
  const lastToken = getLastToken(query);
  if (!lastToken) return true;

  const titleTokens = normalize(title).split(' ');

  return titleTokens.some(tt => tt.startsWith(lastToken));
}

export function SearchAutoCompleteDropDown() {
  const {
    submitSearch,
    debouncedQuery,
    autoCompleteItems,
    isAutoCompleteOpen,
    isAutoCompleteLoading,
    navigateToAutoCompleteItem,
    addTags,
    currentConfig,
  } = useSearchContext();

  const [listOverflown, setListOverflown] = useState(false);

  const onItemsOverflow = useCallback(state => {
    setListOverflown(state);
  }, []);

  const filteredItems = useMemo(() => {
    if (!autoCompleteItems) return [];

    return autoCompleteItems.filter(item => matchesAutocomplete(debouncedQuery, item.title));
  }, [autoCompleteItems, debouncedQuery]);

  return (
    <OverlayContainer isOpen={isAutoCompleteOpen} className="left-0 top-[58px] z-[4999]">
      {debouncedQuery?.length >= SEARCH_MIN_QUERY_LENGTH ? (
        <>
          {isAutoCompleteLoading && (
            <div className="flex w-full items-center justify-center py-2">
              <CircularProgress />
            </div>
          )}

          {!isAutoCompleteLoading && (
            <>
              <OverlayList
                maxItemCount={5}
                listItems={filteredItems.map(item => ({
                  ...item,
                  onClick: e => {
                    e.stopPropagation();
                    if (currentConfig.searchType === specialistTypeEnum.REQUEST) {
                      addTags(item);
                      return;
                    }
                    navigateToAutoCompleteItem(item);
                  },
                }))}
                onItemsOverflow={onItemsOverflow}
              />

              {listOverflown && (
                <button
                  className="rounded-full bg-primary-200 p-2 pl-8 font-bold text-primary-800 hover:bg-primary-300"
                  onClick={e => {
                    e.stopPropagation();
                    submitSearch();
                    window.blur();
                  }}
                >
                  Показати всі результати
                </button>
              )}

              {filteredItems.length === 0 && <p className="px-6 py-2 opacity-70">Нічого не знайдено</p>}
            </>
          )}
        </>
      ) : (
        <p className="p-2 pl-8 opacity-70">Продовжуйте вводити запит</p>
      )}
    </OverlayContainer>
  );
}
