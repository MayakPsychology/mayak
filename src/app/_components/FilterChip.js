import { ArrowIconDown, ArrowIconUp } from '@icons/index';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { FilterChipCounter } from '@components/FilterChipCounter';
import { cn } from '@/utils/cn';

export const FilterChip = forwardRef(({ text, opened, count, onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className={cn(
      'group relative flex h-8 w-max cursor-pointer items-center justify-center gap-1 rounded-3xl border border-gray-700 px-3 py-1.5 hover:bg-gray-200',
      opened && 'bg-primary-200',
    )}
  >
    <p className={cn('text-p4', opened && 'text-primary-500')}>{text}</p>
    <FilterChipCounter count={count} />
    {opened ? <ArrowIconDown /> : <ArrowIconUp />}
  </div>
));

FilterChip.displayName = 'FilterChip';

FilterChip.propTypes = {
  text: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
