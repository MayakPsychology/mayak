'use-client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '@/app/_components/TextArea';

export function AdressesGroup() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label className="text-base mb-2 block font-medium">
        Адреса / адреси, де надаються послуги <span className="text-red-500">*</span>
      </label>
      <Controller
        name="addresses"
        control={control}
        render={({ field }) => (
          <TextArea {...field} maxLength={320} placeholder="Ваша відповідь" required error={errors?.message?.message} />
        )}
      />
    </div>
  );
}
