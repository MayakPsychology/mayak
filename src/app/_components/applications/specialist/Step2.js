'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormatOfWork } from '@prisma/client';
import PropTypes from 'prop-types';
import { getChoicesList } from '@/app/(admin)/admin/_utils/common';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { CheckBox } from '@/app/_components/CheckBox';
import { AdressListGroup, WorkTimeGroup } from '../_shared/field-groups';

export function Step2({ districts }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // format of work choices list
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend>Крок 2: Формат роботи і адреси</legend>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>

      {/* Format of work */}
      <div>
        <h3 className="text-base mb-2 block font-medium">
          Формат роботи <span className="text-red-500">*</span>
        </h3>

        <Controller
          name="formatOfWork"
          control={control}
          render={({ field }) => (
            <div>
              {formatOfWorkChoicesList.map(formatOfWork => (
                <CheckBox
                  ref={field.ref}
                  lable="Ваша стать"
                  type="radio"
                  key={formatOfWork.id}
                  value={formatOfWork.id}
                  text={formatOfWork.name}
                  checked={field.value === formatOfWork.id}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange(formatOfWork.id)}
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

      <AdressListGroup districts={districts} />
      <WorkTimeGroup />
    </fieldset>
  );
}

Step2.propTypes = {
  districts: PropTypes.array,
};
