import PropTypes from 'prop-types';
import { Dot } from '@icons/index';
import { ListTruncator } from '@components/ListTruncator';
import { Caption } from '@components/Typography';
import { cn } from '@utils/cn';

export function SpecializationsPanel({ specialistId, specializations, extendedCardOpened = false, className }) {
  return extendedCardOpened ? (
    <div className={cn('inline-flex shrink flex-wrap items-center gap-[8px]', className)}>
      {specializations.map((specialization, index) => (
        <div className="flex items-center justify-center gap-2.5" key={`${specialization}-${index}`}>
          <Caption className="whitespace-normal text-start font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot key={`dot-${specialization}-${index}`} />}
        </div>
      ))}
    </div>
  ) : (
    <ListTruncator
      id={specialistId}
      content={specializations.map((specialization, index) => (
        <div key={`${specialization}-${index}`} className="flex items-center justify-center gap-2.5">
          <Caption className="whitespace-nowrap text-start text-cardsm font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </div>
      ))}
      hintContent={specializations.map((specialization, index) => (
        <div key={`hint-${specialization}-${index}`} className="text-center text-c2 text-gray-900">
          {specialization}
        </div>
      ))}
    />
  );
}

SpecializationsPanel.propTypes = {
  specializations: PropTypes.arrayOf(PropTypes.string).isRequired,
  specialistId: PropTypes.string.isRequired,
  extendedCardOpened: PropTypes.bool,
  className: PropTypes.string,
};
