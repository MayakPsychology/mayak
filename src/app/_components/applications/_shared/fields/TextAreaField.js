'use client';

import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '@/app/_components/TextArea';
import { FieldHeading } from './FieldHeading';
import { FieldHints } from './FieldHint';

export function TextAreaField({ name, label, hints, placeholder, maxLength = 1000, isRequired = true }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && <FieldHeading isRequired={isRequired}>{label}</FieldHeading>}
      <FieldHints hints={hints} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            value={field.value ?? ''}
            maxLength={maxLength}
            placeholder={placeholder}
            error={get(errors, name)?.message}
          />
        )}
      />
    </div>
  );
}

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  hints: PropTypes.array,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  isRequired: PropTypes.bool,
};
