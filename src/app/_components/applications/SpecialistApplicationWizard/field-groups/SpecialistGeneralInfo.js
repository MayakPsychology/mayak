import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormatOfWork, Gender } from '@prisma/client';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { getChoicesList } from '@/app/(admin)/admin/_utils/common';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';

export function SpecialistGeneralInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  // gender choices list
  const genderChoicesList = getChoicesList(Object.values(Gender), FormTranslations.gender);

  // format of work choices list
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  return (
    <>
      <TextInputField
        {...register('firstName')}
        placeholder="Ім'я"
        error={errors?.firstName?.message}
        required
        additionalContainerStyle="bg-other-white"
      />
      <TextInputField
        {...register('secondName')}
        placeholder="По-батькові"
        error={errors?.secondName?.message}
        required
        additionalContainerStyle="bg-other-white"
      />
      <TextInputField
        {...register('lastName')}
        placeholder="Прізвище"
        error={errors?.lastName?.message}
        required
        additionalContainerStyle="bg-other-white"
      />

      {/* Experience (years) */}
      <TextInputField
        {...register('experience')}
        placeholder="Стаж роботи"
        type="number"
        min={0}
        step={0.5}
        error={errors?.experience?.message}
        required
        additionalContainerStyle="bg-other-white"
      />

      {/* Gender choice */}
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
      </fieldset>

      {/* Format of work */}
      <fieldset>
        <legend className="text-base mb-2 block font-medium">
          Формат роботи <span className="text-red-500">*</span>
        </legend>

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
      </fieldset>
    </>
  );
}
