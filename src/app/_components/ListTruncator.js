'use client';

import PropTypes from 'prop-types';
import { Show as ShowHint, Window as HintWindow } from '@components/Hint';
import { useOverflow } from '@hooks';
import { cn } from '@utils/cn';

let uniqueId = 0;

export function ListTruncator({
  id,
  content,
  hintContent,
  ellipsis,
  hintEllipsisClassName,
  hintWindowClassName,
  onHintClick,
}) {
  const { wrapperRef, containerRef, overflown } = useOverflow();

  uniqueId += 1;
  const hintId = `hint-for-${id}-${uniqueId}`;

  return (
    <div ref={containerRef} className="relative max-w-full">
      <div className="overflow-hidden">
        <span ref={wrapperRef} className="relative inline-flex items-center gap-2 overflow-hidden">
          {content}
        </span>
      </div>

      {overflown && (
        <>
          <ShowHint actions={{ onClick: onHintClick }} opens={hintId}>
            <div
              className={cn(
                'absolute right-0 top-[-3px] flex w-full cursor-pointer select-none justify-end',
                hintEllipsisClassName,
                'absolute select-none',
              )}
            >
              {ellipsis || (
                <span className="flex w-[80px] justify-end bg-gradient-to-l from-other-white from-[30%] text-gray-600">
                  ...
                </span>
              )}
            </div>
          </ShowHint>
          <HintWindow
            name={hintId}
            id={hintId}
            className={cn(
              'right-2.5 top-[30px] z-[200] flex select-text flex-col gap-2.5 text-gray-900',
              hintWindowClassName,
            )}
          >
            {hintContent}
          </HintWindow>
        </>
      )}
    </div>
  );
}

ListTruncator.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  hintContent: PropTypes.node.isRequired,
  ellipsis: PropTypes.node,
  hintWindowClassName: PropTypes.string,
  hintEllipsisClassName: PropTypes.string,
  onHintClick: PropTypes.func,
};
