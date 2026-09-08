'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { SelectField, TextInputField } from '@/app/_components/InputFields';
import { GENDER_OPTIONS } from '@/app/config/application/choices';
import { FieldHeading, FieldHint, TextAreaField } from '../../_shared/fields';

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

  return (
    <>
      <fieldset>
        <FieldHeading as="legend">Як до Вас звертатись</FieldHeading>
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
        <FieldHeading as="legend">Ваша стать</FieldHeading>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div>
              {GENDER_OPTIONS.map(gender => (
                <CheckBox
                  key={gender.value}
                  name="gender"
                  type="radio"
                  value={gender.value}
                  text={gender.label}
                  checked={field.value === gender.value}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange(gender.value)}
                />
              ))}
            </div>
          )}
        />
        {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
      </fieldset>

      <TextAreaField
        name="experience"
        label="Досвід"
        hints={[
          'Вкажіть орієнтовну кількість клієнтів, з якими ви працювали, та типові запити, у яких маєте найбільший досвід. Опишіть основний фокус вашої практики (детальні запити для фільтрації будуть у наступних питаннях). За бажанням зазначте членство у професійних спілках або чесно вкажіть, якщо ви лише починаєте свій професійний шлях.',
        ]}
        placeholder="Опишіть Ваш досвід"
        maxLength={5000}
      />

      <div>
        <FieldHeading>Вкажіть орієнтовний місяць та рік початку Вашої роботи</FieldHeading>
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
