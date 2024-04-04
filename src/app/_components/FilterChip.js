'use client';

import { ArrowIconDown, ArrowIconUp, Ellipse } from '@icons/index';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function FilterChip({ text, opened, count, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex h-8 w-max cursor-pointer items-center justify-center gap-1 rounded-3xl border border-gray-700 px-3 py-1.5 hover:bg-gray-200',
        opened && 'bg-primary-200',
      )}
    >
      <p className={cn('text-p4', opened && 'text-primary-500')}>{text}</p>
      <div className={cn('relative h-[15px] w-[15px]', count === 0 && 'hidden')}>
        <Ellipse />
        <p className="absolute left-[4px] top-[2px] text-c5 font-bold text-primary-500">{count}</p>
      </div>
      {opened ? <ArrowIconDown /> : <ArrowIconUp />}
    </div>
  );
}

FilterChip.propTypes = {
  text: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
