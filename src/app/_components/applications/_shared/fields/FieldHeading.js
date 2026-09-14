'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

// Every question in the mocks is 20px bold with a red asterisk when it is required.
export function FieldHeading({ as: Tag = 'h3', children, isRequired = true, info, className }) {
  const [isInfoOpen, setInfoOpen] = useState(false);

  return (
    <Tag className={cn('mb-2 text-p1 font-bold text-primary-900', className)}>
      {children}
      {isRequired && <span className="text-system-error"> *</span>}
      {info && (
        <span className="relative ml-1 inline-block align-super">
          <button
            type="button"
            aria-label="Показати підказку"
            aria-expanded={isInfoOpen}
            onClick={() => setInfoOpen(open => !open)}
            className="flex h-4 w-4 items-center justify-center rounded-full border border-primary-900 text-[10px] font-bold leading-none"
          >
            i
          </button>
          {isInfoOpen && (
            <span className="absolute right-0 top-6 z-10 block w-64 rounded-xl bg-other-white p-4 text-center text-p4 font-normal text-primary-900 shadow-custom-2">
              {info}
            </span>
          )}
        </span>
      )}
    </Tag>
  );
}

FieldHeading.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  isRequired: PropTypes.bool,
  info: PropTypes.node,
  className: PropTypes.string,
};
