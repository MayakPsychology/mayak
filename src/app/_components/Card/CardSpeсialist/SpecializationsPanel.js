import P from 'prop-types';
import { Dot } from '@icons/index';
import { Caption, ListTruncator } from '@components';

export function SpecializationsPanel({ specialistId, specializations, extendedCardOpened = false }) {
  return extendedCardOpened ? (
    <div className="inline-flex flex-wrap items-center gap-[8px]">
      {specializations.map((specialization, index) => (
        <div className="flex items-center justify-center gap-[10px]" key={index}>
          <Caption className="whitespace-nowrap text-start font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </div>
      ))}
    </div>
  ) : (
    <ListTruncator
      id={specialistId}
      items={specializations}
      itemRender={(specialization, index) => (
        <div className="flex items-center justify-center gap-[10px]" key={index}>
          <Caption className="whitespace-nowrap text-start text-cardsm font-bold text-gray-600 lg:text-p4">
            {specialization}
          </Caption>
          {index !== specializations.length - 1 && <Dot />}
        </div>
      )}
      tooltipItemRender={(specialization, index) => (
        <div key={index} className="text-center text-c2 text-gray-900">
          {specialization}
        </div>
      )}
    />
  );
}

SpecializationsPanel.propTypes = {
  specializations: P.arrayOf(P.string).isRequired,
  specialistId: P.string.isRequired,
  extendedCardOpened: P.bool,
};
