'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { FormatOfWork } from '@prisma/client';
import { getChoicesList } from '@/app/(admin)/admin/_utils/common';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { CheckBox } from '@/app/_components/CheckBox';

export function FormatOfWorkGroup({ title }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const choices = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  return (
    <div>
      <h3 className="text-base mb-2 block font-medium">
        {title} <span className="text-red-500">*</span>
      </h3>

      <Controller
        name="formatOfWork"
        control={control}
        render={({ field }) => (
          <div>
            {choices.map(choice => (
              <CheckBox
                ref={field.ref}
                name="formatOfWork"
                type="radio"
                key={choice.id}
                value={choice.id}
                text={choice.name}
                checked={field.value === choice.id}
                onBlur={field.onBlur}
                onChange={() => field.onChange(choice.id)}
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
