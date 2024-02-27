'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import P from 'prop-types';

import { Show as ShowHint, Window as HintWindow } from './Hint';

export function ListTruncator({ id, items, ellipsis, itemRender, tooltipItemRender }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [overflown, setOverflown] = useState(false);

  const calculateOverflow = useCallback(() => {
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    if (wrapperWidth >= containerWidth) {
      setOverflown(true);
    } else {
      setOverflown(false);
    }
  }, [wrapperRef, containerRef]);

  useEffect(() => {
    calculateOverflow();
    window.addEventListener('resize', calculateOverflow);

    return () => {
      window.removeEventListener('resize', calculateOverflow);
    };
  }, [calculateOverflow]);

  return (
    <div id={`specializations-of-${id}`} ref={containerRef} className="w-full">
      <span id={`wrapper-of-${id}`} className="inline-flex items-center gap-[8px] pr-[50px]" ref={wrapperRef}>
        {items.map(itemRender)}
      </span>
      {overflown && (
        <>
          <ShowHint
            opens={`hint-for-${id}`}
            actions={{
              onMouseEnter: ({ open }) => open(`hint-for-${id}`),
              onMouseLeave: ({ close }) => close(),
              onClick: ({ open }) => {
                open(n => (n === `hint-for-${id}` ? '' : `hint-for-${id}`));
              },
            }}
          >
            <span className="absolute right-0 top-0 flex w-[80px] cursor-pointer select-none bg-gradient-to-l from-other-white from-[30%]">
              {ellipsis || <div className="flex w-full justify-end font-bold text-gray-600">&nbsp;...&nbsp;</div>}
            </span>
          </ShowHint>
          <HintWindow name={`hint-for-${id}`} className="right-0 top-[20px]">
            <div className="flex flex-col gap-[10px] rounded-[4px] px-[8px] py-[4px] shadow-[0_2px_8px_0px_rgba(192,191,206,0.50)]">
              {items.map(tooltipItemRender)}
            </div>
          </HintWindow>
        </>
      )}
    </div>
  );
}

ListTruncator.propTypes = {
  id: P.string.isRequired,
  items: P.arrayOf(P.string).isRequired,
  itemRender: P.func.isRequired,
  tooltipItemRender: P.func.isRequired,
  ellipsis: P.node,
};
