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
        additionalContainerStyle="bg-other-white"
      />
      <TextInputField
        {...register('surname')}
        placeholder="По-батькові"
        error={errors?.surname?.message}
        additionalContainerStyle="bg-other-white"
      />
      <TextInputField
        {...register('lastName')}
        placeholder="Прізвище"
        error={errors?.lastName?.message}
        additionalContainerStyle="bg-other-white"
      />

      {/* Experience (years) */}
      <TextInputField
        {...register('yearsOfExperience')}
        placeholder="Стаж роботи"
        type="number"
        min={0}
        step={0.5}
        error={errors?.yearsOfExperience?.message}
        additionalContainerStyle="bg-other-white"
      />

      {/* Gender choice */}
      <div>
        <h3 className="text-base mb-2 block font-medium">
          Ваша стать <span className="text-red-500">*</span>
        </h3>

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
        {errors.gender && (
          <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
            {errors.gender.message}
          </p>
        )}
      </div>

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
    </>
  );
}
