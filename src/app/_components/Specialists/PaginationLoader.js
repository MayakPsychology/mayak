import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function PaginationLoader({ innerRef, className }) {
  const loadingTextStyles =
    'align-center px-auto flex h-10 w-[170px] flex-col justify-center gap-2 self-center rounded-[100px] bg-primary-200 px-[10px] text-center text-p4 font-bold text-gray-700';

  return (
    <div className={cn('mx-auto flex flex-col', className)} ref={innerRef}>
      <p className={loadingTextStyles}>Завантажується</p>
    </div>
  );
}

PaginationLoader.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};
