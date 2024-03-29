'use client';

import { DownTick } from '@icons/index';
import { cn } from '@/utils/cn';
import { useSearchContext } from './SearchContext';
import { searchInputTypeConfigs } from './config';
import { OverlayContainer } from './OverlayContainer';
import { OverlayList } from './OverlayList';

export function SearchTypeDropDown() {
  const { currentConfig, isSelectTypeOpen, setSearchType, setIsSelectTypeOpen } = useSearchContext();

  return (
    <>
      <div className="relative flex min-w-[200px] items-center gap-4 pr-6">
        <p className="grow text-center lg:text-left">{currentConfig.title}</p>
        <button className='top-0" absolute right-4'>
          <DownTick className={cn(isSelectTypeOpen && 'rotate-180')} />
        </button>
      </div>
      <OverlayContainer isOpen={isSelectTypeOpen} className="left-0 top-[58px] z-[5000] lg:w-[300px]">
        <OverlayList
          listItems={searchInputTypeConfigs.map(config => ({
            id: config.id,
            title: config.title,
            onClick: e => {
              e.stopPropagation();
              setSearchType(config.searchType);
              setIsSelectTypeOpen(state => !state);
            },
          }))}
        />
      </OverlayContainer>
    </>
  );
}
