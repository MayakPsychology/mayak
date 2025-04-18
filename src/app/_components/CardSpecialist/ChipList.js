'use client';

import 'react-truncate-list/dist/styles.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { TruncatedList } from 'react-truncate-list';
import { cn } from '@utils/cn';
import { Paragraph } from '@components/Typography';

function ChipListItem({ id, title, tooltipText, iconClassName, containerClassName, textClassName, icon }) {
  return (
    <div
      data-tooltip-id={id}
      className={cn('flex h-[24px] place-items-center gap-1 rounded-3xl px-3 py-1', containerClassName)}
    >
      <div className={cn(iconClassName)}>{icon}</div>
      <span className={cn('truncate text-c3 font-medium', textClassName)} data-tooltip-id={id}>
        {title}
      </span>
      {tooltipText && (
        <Tooltip
          id={id}
          style={{ backgroundColor: '#fff', color: '#080809', boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.2)' }}
          place="bottom"
          opacity={1}
        >
          <Paragraph className="max-w-64 md:max-w-80">{tooltipText}</Paragraph>
        </Tooltip>
      )}
    </div>
  );
}

ChipListItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  containerClassName: PropTypes.string,
  textClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  icon: PropTypes.node,
};

export function ChipList({ id, items, className }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <TruncatedList
        alwaysShowTruncator
        className={cn('truncated-list flex flex-wrap gap-[8px]', expanded ? 'max-h-none' : 'max-h-14 md:max-h-6')}
        renderTruncator={({ hiddenItemsCount }) => {
          if (expanded) {
            return (
              <span className="cursor-pointer text-c3 text-gray-900" onClick={() => setExpanded(false)}>
                Приховати
              </span>
            );
          }
          if (hiddenItemsCount > 0) {
            return (
              <span className="cursor-pointer text-c3 text-gray-900" onClick={() => setExpanded(true)}>
                +{hiddenItemsCount}
              </span>
            );
          }
          return <></>;
        }}
      >
        {items.map(({ id: itemId, ...rest }) => (
          <ChipListItem key={`${id}_${itemId}`} id={`${id}_${itemId}`} {...rest} />
        ))}
      </TruncatedList>
    </div>
  );
}

ChipList.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(ChipListItem.propTypes)).isRequired,
  className: PropTypes.string,
};
