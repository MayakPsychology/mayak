'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '@/app/_components/TextArea';
import { FieldHint } from './FieldHint';

export function DescriptionField({ label, hint, placeholder }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="text-base mb-2 block font-medium" htmlFor="description">
        {label} <span className="text-red-500">*</span>
      </label>
      {hint && <FieldHint>{hint}</FieldHint>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            value={field.value ?? ''}
            maxLength={5000}
            placeholder={placeholder}
            error={errors?.description?.message}
          />
        )}
      />
    </div>
  );
}

DescriptionField.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
};
DescriptionField.defaultProps = {
  label: 'Що ми можемо додати про Вас у пункт Опис?',
  placeholder: 'Ваша відповідь',
};
