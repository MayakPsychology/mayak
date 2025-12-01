'use-client';

import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';
import { SelectField } from '@/app/_components/InputFields/SelectField';

export function AdressGroup({ districts, index }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <Controller
        name={`addresses.${index}.isPrimary`}
        control={control}
        render={({ field }) => (
          <CheckBox checked={field.value ?? false} onChange={field.onChange} ref={field.ref} text="Головна адреса" />
        )}
      />
      <TextInputField
        {...register(`addresses.${index}.fullAddress`)}
        placeholder="Повна адреса (Вулиця, номер будинку, поверх, кабінет)"
        error={errors?.fullAdress?.message}
        required
      />
      <TextInputField
        {...register(`addresses.${index}.nameOfClinic`)}
        placeholder="Назва клініки"
        error={errors?.nameOfClinic?.message}
      />
      <SelectField
        {...register(`addresses.${index}.districtId`)}
        options={districts}
        placeholder="Район"
        error={errors.districtId?.message}
      />
    </div>
  );
}
AdressGroup.propTypes = {
  districts: PropTypes.array,
  index: PropTypes.number,
};
