import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function FilterChipCounter({ count, className, ...rest }) {
  return <div className={cn('relative h-[15px] min-w-[15px] flex-none rounded-full bg-blue-200 flex items-center justify-center', {
    hidden: !count,
  }, className)} {...rest}>
    <p className="text-c5 font-bold text-primary-500 px-0.5">{count}</p>
  </div>
};

FilterChipCounter.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};
