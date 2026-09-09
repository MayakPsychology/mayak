'use client';

import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';
import { FieldHeading } from './FieldHeading';
import { FieldHints } from './FieldHint';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

/**
 * Radio question from the mocks. An option flagged `isOther` reveals the free-text
 * input the designs draw right under the "інше:" row.
 */
export function RadioGroupField({ name, label, hints, options, otherField, otherPlaceholder, isRequired = true }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const selected = useWatch({ control, name });
  const otherOption = options.find(option => option.isOther);
  const isOtherSelected = otherOption !== undefined && selected === otherOption.value;
  // the free-text error renders on its own input below, so only the radio error shows here
  const error = get(errors, name)?.message;

  return (
    <div>
      {label && <FieldHeading isRequired={isRequired}>{label}</FieldHeading>}
      <FieldHints hints={hints} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {options.map((option, index) => (
              <CheckBox
                key={option.label}
                type="radio"
                name={name}
                value={String(index)}
                text={option.label}
                checked={field.value === option.value}
                onBlur={field.onBlur}
                onChange={() => field.onChange(option.value)}
              />
            ))}
          </div>
        )}
      />
      {isOtherSelected && otherField && (
        <div className="ml-9 mt-2">
          <TextInputField
            {...register(otherField)}
            placeholder={otherPlaceholder ?? 'Ваша відповідь'}
            absolute={false}
            additionalContainerStyle="bg-other-white"
            error={get(errors, otherField)?.message}
          />
        </div>
      )}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

RadioGroupField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  hints: PropTypes.array,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string.isRequired,
      isOther: PropTypes.bool,
    }),
  ).isRequired,
  otherField: PropTypes.string,
  otherPlaceholder: PropTypes.string,
  isRequired: PropTypes.bool,
};
