import { useEffect, useRef } from 'react';
import { useFocus, useKeyPress } from '@/app/_hooks';
import { useSearchContext } from './SearchContext';
import { SEARCH_MIN_QUERY_LENGTH } from './config';

export function SearchInputField() {
  const { currentConfig, query, setQuery, setIsAutoCompleteOpen, setIsInputFocused, submitSearch } = useSearchContext();
  const inputRef = useRef(null);
  const inputFocused = useFocus(inputRef);

  useKeyPress('Enter', () => {
    if (inputFocused && query?.length >= SEARCH_MIN_QUERY_LENGTH) {
      submitSearch();
      inputRef.current.blur();
    }
  });

  useEffect(() => {
    setIsInputFocused(inputFocused);
    if (inputFocused) {
      setIsAutoCompleteOpen(query?.length >= 1);
    }
  }, [query, inputFocused, setIsInputFocused, setIsAutoCompleteOpen]);

  return (
    <input
      ref={inputRef}
      className="h-6 w-[1px] grow border-none bg-other-black/0 p-0 caret-primary-500 placeholder:text-p3 placeholder:text-gray-500 focus:ring-0 focus:placeholder:text-other-white/0"
      placeholder={currentConfig.placeholder}
      value={query}
      onChange={e => {
        setQuery(e.target.value);
      }}
    />
  );
}
