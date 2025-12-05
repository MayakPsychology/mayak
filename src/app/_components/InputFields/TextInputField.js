'use client';

import PropTypes from 'prop-types';
import InputErrorIcon from '@icons/inputErrorIcon.svg';
import { cn } from '@utils/cn';
import { forwardRef } from 'react';
import { variants } from './styles';

export const TextInputField = forwardRef(
  (
    {
      value,
      name,
      onChange,
      type = 'text',
      disabled = false,
      placeholder = '',
      error = '',
      hasError = false,
      required = false,
      variant = variants.default,
      absolute = true,
      additionalContainerStyle = '',
      ...inputProps
    },
    ref,
  ) => {
    const id = `textinput_${name}`;
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
            hasError && variant.inputContainer.error,
            additionalContainerStyle,
          )}
        >
          <input
            className={cn(variant.input.base, variant.input.focus, variant.input.style, error && variant.input.error)}
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={`${placeholder}${required ? '*' : ''}`}
            required={required}
            ref={ref}
            {...inputProps}
          />
          {(error || hasError) && <InputErrorIcon className={cn(variant.errorIcon.base)} />}
        </div>

        <label
          className={cn(
            variant.label.base,
            variant.label.stateful,
            absoluteLabel,
            (error || hasError) && variant.label.error,
          )}
          htmlFor={id}
        >
          {placeholder}
        </label>
      </div>
    );
  },
);

TextInputField.displayName = 'TextInputField';

TextInputField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'email', 'url', 'password', 'search', 'tel', 'number']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  hasError: PropTypes.bool,
  required: PropTypes.bool,
  absolute: PropTypes.bool,
  additionalContainerStyle: PropTypes.string,
  variant: PropTypes.shape({
    mainContainer: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
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
    errorIcon: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
    errorParagraph: PropTypes.shape({
      base: PropTypes.string.isRequired,
    }),
  }),
};
