import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '@/app/_components/TextArea';

export function DescriptionField() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label className="text-base mb-2 block font-medium">
        Що ми можемо добавити добавити про Вас у пункт Опис? <span className="text-red-500">*</span>
      </label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            maxLength={320}
            placeholder="Ваша відповідь"
            required
            error={errors?.description?.message}
          />
        )}
      />
    </div>
  );
}
