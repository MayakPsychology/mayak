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
      <span
        className="w-full truncate px-3 py-1 text-c3 font-medium text-primary-600"
        data-tooltip-id={`method_tooltip_${id}`}
      >
        {title}
      </span>
      <Tooltip
        id={`method_tooltip_${id}`}
        style={{ backgroundColor: '#fff', color: '#080809', boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.2)' }}
        place="bottom"
        opacity={1}
      >
        <Paragraph className="max-w-64 md:max-w-80">{description}</Paragraph>
      </Tooltip>
    </div>
  );
}

Method.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export function MethodList({ methods = [], specializations = [], showCaption = true, className }) {
  const [expanded, setExpanded] = useState(false);
  const caption = makeCaption(specializations);

  // If neither "Психотерапевт" nor "Психолог" are included
  // section should not render
  if (!caption) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-2 border-t border-dashed border-t-gray-200 pt-3', className)}>
      {showCaption && <Caption className="text-p4 font-bold text-gray-600">{caption}</Caption>}
      {methods.length === 1 ? (
        <Method id={methods[0].id} title={methods[0].title} description={methods[0].description} />
      ) : (
        <TruncatedList
          alwaysShowTruncator
          className={cn(
            'flex max-w-[550px] gap-2 *:flex-shrink-0',
            expanded ? 'max-h-none flex-wrap' : 'max-h-14 md:max-h-6',
          )}
          renderTruncator={({ hiddenItemsCount }) => {
            const hasHiddenItems = hiddenItemsCount > 0;

            return (
              <button
                className="cursor-pointer text-c3 text-gray-900"
                onClick={e => {
                  e.stopPropagation();
                  setExpanded(hasHiddenItems);
                }}
              >
                {hasHiddenItems ? `+${hiddenItemsCount}` : 'Приховати'}
              </button>
            );
          }}
        >
          {methods.map(({ id, ...rest }) => (
            <Method key={id} id={id} {...rest} />
          ))}
        </TruncatedList>
      )}
    </div>
  );
}

MethodList.propTypes = {
  specializations: PropTypes.arrayOf(PropTypes.string),
  methods: PropTypes.arrayOf(PropTypes.shape(Method.propTypes)),
  showCaption: PropTypes.bool,
  className: PropTypes.string,
};
