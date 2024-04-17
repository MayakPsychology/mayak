import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export default function FilterIconCard({ icon, title, selected, onClick }) {
  return (
    <button
      className={cn(
        'flex flex-col items-center gap-1 rounded-xl border-[0.5px] border-gray-600 px-2 py-[13px] text-p4 transition-all md:py-2 md:text-p3',
        {
          'border-blue-400 bg-white font-semibold text-blue-600': selected,
          'text-gray-800': !selected,
        },
      )}
      onClick={onClick}
    >
      <span
        className={cn('flex items-center justify-center text-[25px] md:text-[40px]', {
          'text-blue-400': selected,
          'text-gray-700': !selected,
        })}
      >
        {icon}
      </span>
      <span>{title}</span>
    </button>
  );
}

FilterIconCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
