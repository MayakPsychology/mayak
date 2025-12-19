import { useEffect, useRef } from 'react';
import { isEnterKey } from '@utils/dom';
import { СrossSmall } from '@icons/index';
import { useFocus, useKeyEvent } from '@/app/_hooks';
import { useSearchContext } from './SearchContext';
import { SEARCH_MIN_QUERY_LENGTH } from './config';

export function SearchInputField() {
  const {
    currentConfig,
    query,
    setQuery,
    setIsAutoCompleteOpen,
    setIsInputFocused,
    submitSearch,
    selectedTags,
    removeTags,
  } = useSearchContext();
  const inputRef = useRef(null);
  const inputFocused = useFocus(inputRef);

  useKeyEvent({
    key: isEnterKey,
    handler: () => {
      if (inputFocused && query?.length >= SEARCH_MIN_QUERY_LENGTH) {
        submitSearch();
        inputRef.current.blur();
      }
    },
  });

  useEffect(() => {
    setIsInputFocused(inputFocused);
    if (inputFocused) {
      setIsAutoCompleteOpen(query?.length >= 1);
    }
  }, [query, inputFocused, setIsInputFocused, setIsAutoCompleteOpen]);

  return (
    <div
      className="flex w-full items-center gap-2
        py-1
        
        
        "
      onClick={() => inputRef.current?.focus()}
    >
      {selectedTags.map(tag => (
        <span
          key={tag.id}
          className="group flex items-center gap-1
    rounded-full bg-primary-200
    px-1.5 py-[6px]
    text-[16px]
    leading-none text-primary-800"
        >
          <span
            className=" inline-block max-w-[120px] overflow-hidden text-ellipsis
    whitespace-nowrap
    opacity-80
    transition-all duration-500 ease-in-out
    group-hover:max-w-[500px]
    group-hover:opacity-100"
          >
            {tag.title}
          </span>
          <button
            className="hover:text-black-600 
    duration-250 
    font-bold 
    text-primary-900 
    transition-all 
    ease-out 
    hover:scale-125"
            onClick={e => {
              e.stopPropagation();
              removeTags(tag.id);
            }}
          >
            <СrossSmall />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        className=" h-6 grow border-none bg-other-black/0 p-0 caret-primary-500 placeholder:text-p3 placeholder:text-gray-500 focus:ring-0 focus:placeholder:text-other-white/0"
        placeholder={currentConfig.placeholder}
        value={query}
        onChange={e => {
          const value = e.target.value.replace(/['’]/g, 'ʼ');
          setQuery(value);
        }}
      />
    </div>
  );
}
