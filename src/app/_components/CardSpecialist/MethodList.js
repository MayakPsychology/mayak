import { useState } from 'react';
import { TruncatedList } from 'react-truncate-list';
import { Tooltip } from 'react-tooltip';
import PropTypes from 'prop-types';
import 'react-truncate-list/dist/styles.css';
import { cn } from '@utils/cn';
import { Caption, Paragraph } from '@components/Typography';

function makeCaption(specializations) {
  const hasPsychotherapist = specializations.includes('Психотерапевт');
  const hasPsychologist = specializations.includes('Психолог');

  if (hasPsychotherapist && !hasPsychologist) {
    return 'Методи терапії';
  }
  if (!hasPsychotherapist && hasPsychologist) {
    return 'Спеціалізація';
  }
  if (hasPsychotherapist && hasPsychologist) {
    return 'Напрями і методи';
  }
  return '';
}

function Method({ id, title, description }) {
  return (
    <div className="grid h-[24px] w-fit place-items-center rounded-3xl bg-primary-100">
      <span className="w-full px-3 py-1 text-c3 font-medium text-primary-600" data-tooltip-id={`method_tooltip_${id}`}>
        {title}
      </span>
      <Tooltip
        id={`method_tooltip_${id}`}
        style={{ backgroundColor: '#FFF', color: '#080809', boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.2)' }}
        place="bottom"
        opacity={1}
      >
        <Paragraph className="max-w-64 md:max-w-80">{description}</Paragraph>
      </Tooltip>
    </div>
  );
}
Method.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export function MethodList({ methods = [], specializations = [] }) {
  const [expanded, setExpanded] = useState(false);
  const caption = makeCaption(specializations);

  // If neither "Психотерапевт" nor "Психолог" are included
  // section should not render
  if (!caption) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border-t pt-3">
      <Caption className="text-p4 font-bold text-gray-600">{caption}</Caption>
      <TruncatedList
        alwaysShowTruncator
        className={cn('flex flex-wrap gap-[8px]', expanded ? 'max-h-none' : 'max-h-14 md:max-h-6')}
        renderTruncator={({ hiddenItemsCount }) => {
          if (hiddenItemsCount > 0) {
            return (
              <span className="cursor-pointer text-c3 text-gray-900" onClick={() => setExpanded(true)}>
                +{hiddenItemsCount}
              </span>
            );
          }
          return (
            <span className="cursor-pointer text-c3 text-gray-900" onClick={() => setExpanded(false)}>
              Приховати
            </span>
          );
        }}
      >
        {methods.map(({ id, ...rest }) => (
          <Method key={id} id={id} {...rest} />
        ))}
      </TruncatedList>
    </div>
  );
}
MethodList.propTypes = {
  specializations: PropTypes.arrayOf(PropTypes.string),
  methods: PropTypes.arrayOf(Method.propTypes),
};
