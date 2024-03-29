import { useCallback, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { OverlayContainer } from './OverlayContainer';
import { OverlayList } from './OverlayList';
import { useSearchContext } from './SearchContext';
import { SEARCH_MIN_QUERY_LENGTH } from './config';

export function SearchAutoCompleteDropDown() {
  const {
    submitSearch,
    debouncedQuery,
    autoCompleteItems,
    isAutoCompleteOpen,
    isAutoCompleteLoading,
    navigateToAutoCompleteItem,
  } = useSearchContext();
  const [listOverflown, setListOverflown] = useState(false);

  const onItemsOverflow = useCallback(state => {
    setListOverflown(state);
  }, []);

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
                listItems={autoCompleteItems?.map(item => ({
                  ...item,
                  onClick: e => {
                    e.stopPropagation();
                    navigateToAutoCompleteItem(item.id);
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
              {autoCompleteItems?.length === 0 && <p className="px-6 py-2">Нічого не знайдено</p>}
            </>
          )}
        </>
      ) : (
        <p className="p-2 pl-8">Продовжуйте вводити запит</p>
      )}
    </OverlayContainer>
  );
}
