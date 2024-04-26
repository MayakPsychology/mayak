'use client';

import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const TextArea = forwardRef(({ value, onChange, maxLength, placeholder, error, required = false }, ref) => {
  const valueLength = String(value ?? '').length;
  return (
    <div className="relative flex h-full flex-col gap-1">
      <textarea
        className="appereance-none grow resize-none rounded-xl border-none text-gray-900"
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        ref={ref}
        placeholder={`${placeholder}${required ? '*' : ''}`}
      />
      {error && <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{error}</p>}
      {maxLength && (
        <div className="flex flex-row-reverse">
          <span className="mt-5 text-primary-500 lg:mt-0">
            {valueLength ? `${valueLength} / ${maxLength}` : `${maxLength} символів`}
          </span>
        </div>
      )}
    </div>
  );
})

TextArea.displayName = 'TextArea'

TextArea.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.string,
};
