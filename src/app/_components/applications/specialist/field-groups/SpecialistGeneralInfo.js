'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Gender } from '@prisma/client';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { getChoicesList } from '@/app/(admin)/admin/_utils/common';
import { CheckBox } from '@/app/_components/CheckBox';
import { SelectField, TextInputField } from '@/app/_components/InputFields';
import { FieldHint } from '../../_shared/fields';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

// 0.5 … 40 years, matching the "rounded down in 0.5 year steps" rule shown next to the field.
const EXPERIENCE_OPTIONS = Array.from({ length: 80 }, (unused, i) => {
  const years = (i + 1) / 2;
  return { value: years, name: String(years).replace('.', ',') };
});

const nameFields = [
  { name: 'lastName', placeholder: 'Прізвище' },
  { name: 'firstName', placeholder: "Ім'я" },
  { name: 'surname', placeholder: 'По-батькові' },
];

export function SpecialistGeneralInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const genderChoicesList = getChoicesList(Object.values(Gender), FormTranslations.gender);

  return (
    <>
      <fieldset>
        <legend className="text-base mb-2 block font-medium">
          Як до Вас звертатись <span className="text-red-500">*</span>
        </legend>
        {nameFields.map(field => (
          <div key={field.name} className="mb-4 flex flex-col gap-1.5">
            <TextInputField
              {...register(field.name)}
              placeholder={field.placeholder}
              error={errors?.[field.name]?.message}
              additionalContainerStyle="bg-other-white"
            />
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend className="text-base mb-2 block font-medium">
          Ваша стать <span className="text-red-500">*</span>
        </legend>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div>
              {genderChoicesList.map(gender => (
                <CheckBox
                  key={gender.id}
                  name="gender"
                  type="radio"
                  value={gender.id}
                  text={gender.name}
                  checked={field.value === gender.id}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange(gender.id)}
                />
              ))}
            </div>
          )}
        />
        {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
      </fieldset>

      <div>
        <label className="text-base mb-2 block font-medium" htmlFor="select_yearsOfExperience">
          Вкажіть орієнтовний місяць та рік початку Вашої роботи <span className="text-red-500">*</span>
        </label>
        <FieldHint>Стаж округлюється в меншу сторону з кроком 0,5 року.</FieldHint>
        <Controller
          name="yearsOfExperience"
          control={control}
          render={({ field }) => (
            <SelectField
              name="yearsOfExperience"
              value={field.value ?? ''}
              onChange={event => field.onChange(event.target.value)}
              placeholder="Роки стажу"
              options={EXPERIENCE_OPTIONS}
              error={errors?.yearsOfExperience?.message}
              additionalContainerStyle="bg-other-white"
            />
          )}
        />
      </div>
    </>
  );
}
