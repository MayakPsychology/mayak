'use client';

import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { forwardRef } from 'react';
import InputErrorIcon from '@icons/inputErrorIcon.svg';
import { variants } from './styles';

export const SelectField = forwardRef(
  (
    {
      value,
      name,
      onChange,
      disabled = false,
      placeholder = '',
      error = '',
      required = false,
      options = [],
      variant = variants.default,
      absolute = true,
      additionalContainerStyle = '',
    },
    ref,
  ) => {
    const id = `select_${name}`;
    const absoluteError = absolute ? 'absolute top-[48px] transition-transform' : '';
    const absoluteLabel = absolute ? 'absolute bottom-[49px]' : '';
    return (
      <div className={cn(`relative`, variant.mainContainer.base)}>
        {error && <p className={cn(absoluteError, variant.errorParagraph.base)}>{error}</p>}
        <div
          className={cn(
            variant.inputContainer.base,
            variant.inputContainer.style,
            variant.inputContainer.focusWithin,
            error && variant.inputContainer.error,
            additionalContainerStyle,
          )}
        >
          <select
            className={cn(variant.input.base, variant.input.focus, variant.input.style, error && variant.input.error)}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            ref={ref}
          >
            <option value="" disabled selected hidden>
              {placeholder}
              {required ? '*' : ''}
            </option>
            {options.map(opt => (
              <option key={opt.id ?? opt.value} value={opt.id ?? opt.value}>
                {opt.name ?? opt.label}
              </option>
            ))}
          </select>
          {error && <InputErrorIcon className={cn(variant.errorIcon.base)} />}
        </div>

        <label
          className={cn(
            variant.label.base,
            variant.label.stateful,
            absoluteLabel,
            error && variant.label.error,
            value ? 'block' : 'hidden',
          )}
          htmlFor={id}
        >
          {placeholder}
        </label>
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';

SelectField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  absolute: PropTypes.bool,
  additionalContainerStyle: PropTypes.string,
  variant: PropTypes.shape({
    mainContainer: PropTypes.shape({ base: PropTypes.string.isRequired }),
    label: PropTypes.shape({
      base: PropTypes.string.isRequired,
      stateful: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    inputContainer: PropTypes.shape({
      base: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      focusWithin: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    input: PropTypes.shape({
      base: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    errorIcon: PropTypes.shape({ base: PropTypes.string.isRequired }),
    errorParagraph: PropTypes.shape({ base: PropTypes.string.isRequired }),
  }),
};
