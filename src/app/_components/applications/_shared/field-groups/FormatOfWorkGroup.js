'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { FORMAT_OF_WORK_OPTIONS } from '@/app/config/application/choices';
import { FieldHeading } from '../fields';

export function FormatOfWorkGroup({ title }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <FieldHeading>{title}</FieldHeading>

      <Controller
        name="formatOfWork"
        control={control}
        render={({ field }) => (
          <div>
            {FORMAT_OF_WORK_OPTIONS.map(choice => (
              <CheckBox
                ref={field.ref}
                name="formatOfWork"
                type="radio"
                key={choice.value}
                value={choice.value}
                text={choice.label}
                checked={field.value === choice.value}
                onBlur={field.onBlur}
                onChange={() => field.onChange(choice.value)}
              />
            ))}
          </div>
        )}
      />
      {errors.formatOfWork && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
          {errors.formatOfWork.message}
        </p>
      )}
    </div>
  );
}

FormatOfWorkGroup.propTypes = { title: PropTypes.string };
FormatOfWorkGroup.defaultProps = { title: 'Формат роботи' };
