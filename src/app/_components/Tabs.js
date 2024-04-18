import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export default function Tabs({ options, value, onChange }) {
  return (
    <div className="flex gap-2 rounded-lg bg-blue-200 px-2.5 py-2 md:p-2">
      {options.map(option => (
        <button
          key={option.value}
          className={cn('flex-1 rounded-lg p-2 text-p2 font-medium transition-colors md:py-3 md:font-semibold', {
            'bg-white text-blue-600': value === option.value,
          })}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};
