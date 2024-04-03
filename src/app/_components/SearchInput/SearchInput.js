'use client';

import { useCallback, useRef } from 'react';
import { ClearSearchIcon, SearchIcon } from '@icons/index';
import { PillButton } from '@components/PillButton';
import { cn } from '@/utils/cn';
import { useClickOutside } from '@/app/_hooks/useClickOutside';
import { useSearchContext } from './SearchContext';
import { SearchTypeDropDown } from './SearchTypeDropDown';
import { SearchAutoCompleteDropDown } from './SearchAutoCompleteDropDown';
import { SearchInputField } from './SearchInputField';

export function SearchInput() {
  const {
    query,
    isSelectTypeOpen,
    isInputFocused,
    setQuery,
    setIsSelectTypeOpen,
    setIsAutoCompleteOpen,
    submitSearch,
  } = useSearchContext();

  const searchTypeDropDownRef = useRef(null);
  const autoCompleteRef = useRef(null);

  const handleClickOutsideSearchTypeDropDown = useCallback(() => {
    setIsSelectTypeOpen(false);
  }, [setIsSelectTypeOpen]);
  useClickOutside(searchTypeDropDownRef, handleClickOutsideSearchTypeDropDown);

  const handleClickOutsideAutoComplete = useCallback(() => {
    if (!isInputFocused) {
      setIsAutoCompleteOpen(false);
    }
  }, [setIsAutoCompleteOpen, isInputFocused]);
  useClickOutside(autoCompleteRef, handleClickOutsideAutoComplete);

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex grow flex-col gap-4 rounded-full lg:flex-row lg:gap-0 lg:border-[1px] lg:border-gray-600 lg:bg-gray-100">
        <div
          ref={searchTypeDropDownRef}
          className={cn(
            'after:hidden after:h-[100%] after:w-[1px] after:rounded-full after:bg-gray-500 hover:after:bg-other-white/0 lg:after:block',
            'relative rounded-full border-[1px] border-gray-600 bg-gray-200 py-3 pl-6 hover:bg-gray-200 lg:flex lg:border-0 lg:bg-other-white/0',
            isSelectTypeOpen && 'bg-other-white',
          )}
          onClick={e => {
            e.stopPropagation();
            setIsAutoCompleteOpen(false);
            setIsSelectTypeOpen(state => !state);
          }}
        >
          <SearchTypeDropDown />
        </div>
        <div
          ref={autoCompleteRef}
          className="group relative flex grow items-center gap-2 rounded-full border-[1px] border-gray-600 px-4 py-3 lg:border-0 lg:bg-other-white/0"
        >
          <SearchIcon className={cn('group-focus-within:hidden', query && 'hidden')} />
          <SearchInputField />
          <ClearSearchIcon
            className={cn('hidden cursor-pointer', query && 'block')}
            onClick={() => {
              setQuery('');
              setIsAutoCompleteOpen(false);
            }}
          />
          <SearchAutoCompleteDropDown />
        </div>
      </div>
      <PillButton variant="filled" colorVariant="blue" onClick={submitSearch}>
        Знайти
      </PillButton>
    </div>
  );
}
