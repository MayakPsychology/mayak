'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { OwnershipType } from '@prisma/client';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { getChoicesList } from '@/app/(admin)/admin/_utils/common';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';

export function OrganizationGeneralInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const ownershipChoices = getChoicesList(Object.values(OwnershipType), FormTranslations.ownershipType);

  return (
    <>
      <h3 className="text-base mb-2 block font-medium">
        Назва організації <span className="text-red-500">*</span>
      </h3>
      <TextInputField
        {...register('name')}
        placeholder="Назва організації"
        error={errors?.name?.message}
        additionalContainerStyle="bg-other-white"
      />

      <TextInputField
        {...register('yearsOnMarket')}
        placeholder="Роки на ринку"
        type="number"
        min={0}
        step={1}
        error={errors?.yearsOnMarket?.message}
        additionalContainerStyle="bg-other-white"
      />

      <TextInputField
        {...register('yearsOfExperience')}
        placeholder="Стаж"
        type="number"
        min={0}
        step={1}
        error={errors?.yearsOfExperience?.message}
        additionalContainerStyle="bg-other-white"
      />

      <div>
        <h3 className="text-base mb-2 block font-medium">
          Форма власності <span className="text-red-500">*</span>
        </h3>
        <Controller
          name="ownershipType"
          control={control}
          render={({ field }) => (
            <div>
              {ownershipChoices.map(choice => (
                <CheckBox
                  key={choice.id}
                  name="ownershipType"
                  type="radio"
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
        {errors.ownershipType && (
          <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
            {errors.ownershipType.message}
          </p>
        )}
      </div>

      <Controller
        name="isInclusiveSpace"
        control={control}
        render={({ field }) => (
          <CheckBox
            name={field.name}
            checked={field.value ?? false}
            onChange={field.onChange}
            ref={field.ref}
            text="Інклюзивний простір"
          />
        )}
      />
    </>
  );
}
