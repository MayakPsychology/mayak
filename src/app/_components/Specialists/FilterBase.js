'use client';

import { useEffect, useRef, useState } from 'react';
import { FilterChip } from '@components/FilterChip';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/app/_hooks';
import { screens } from '@/app/styles/tailwind/ui';

export function FilterBase({ count, children, filterText, originFromRight = false }) {
  const [opened, setOpened] = useState(false);
  const [filterWidth, setFilterWidth] = useState(0);
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  const isScreenMd = useMediaQuery(`(min-width: ${screens.md})`);
  const dropdownWidth = isScreenMd ? 320 : 300;

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && opened) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  useEffect(() => {
    const node = filterRef.current;
    if (!node) return undefined;

    const observer = new ResizeObserver(elements => {
      setFilterWidth(elements[0].target.getBoundingClientRect().width);
    });
    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [filterRef.current]);

  return (
    <div className="relative">
      <FilterChip
        ref={filterRef}
        opened={opened}
        text={filterText}
        count={count}
        onClick={() => {
          setOpened(!opened);
        }}
      />
      <div
        ref={dropdownRef}
        className={cn(
          `z-15 relative -mr-[255px] box-border hidden  flex-col rounded-3xl border bg-other-white px-2 py-1`,
          'w-max max-w-[300px] md:max-w-[320px]',
          {
            flex: opened,
          },
        )}
        style={{
          left: originFromRight ? `-${dropdownWidth - filterWidth}px` : '',
        }}
      >
        {children}
      </div>
    </div>
  );
}

FilterBase.propTypes = {
  count: PropTypes.number,
  children: PropTypes.node,
  filterText: PropTypes.string,
  originFromRight: PropTypes.bool,
};
