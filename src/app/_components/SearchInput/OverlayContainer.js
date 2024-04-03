import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function OverlayContainer({ isOpen, children, className }) {
  return (
    <div
      className={cn(
        'shadow-[1px_2px_4px_0px_rgba(192,191,206,0.50),0px_0px_8px_0px_rgba(192,191,206,0.50)]',
        'absolute hidden w-full flex-col rounded-[24px] bg-other-white p-1 text-gray-700',
        isOpen && 'flex',
        className,
      )}
    >
      {children}
    </div>
  );
}

OverlayContainer.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
