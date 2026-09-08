'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { SelectField, TextInputField } from '@/app/_components/InputFields';

export function AdressGroup({ cities, index }) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const cityId = useWatch({ control, name: `addresses.${index}.city` });
  const districts = cities.find(city => city.id === cityId)?.districts ?? [];
  const addressErrors = errors?.addresses?.[index];

  // Order comes from the mocks: city first, then district, then the street line.
  return (
    <div className="flex flex-col gap-6">
      <Controller
        name={`addresses.${index}.isPrimary`}
        control={control}
        render={({ field }) => (
          <CheckBox checked={field.value ?? false} onChange={field.onChange} ref={field.ref} text="Головна адреса" />
        )}
      />
      <Controller
        name={`addresses.${index}.city`}
        control={control}
        render={({ field }) => (
          <SelectField
            name={field.name}
            value={field.value ?? ''}
            onChange={event => {
              field.onChange(event.target.value);
              // the previously chosen district belongs to the previous city
              setValue(`addresses.${index}.district`, null);
            }}
            options={cities}
            placeholder="Місто"
            required
            error={addressErrors?.city?.message}
          />
        )}
      />
      {/* Districts only exist for the few cities that are split into them. */}
      {districts.length > 0 && (
        <Controller
          name={`addresses.${index}.district`}
          control={control}
          render={({ field }) => (
            <SelectField
              name={field.name}
              value={field.value ?? ''}
              onChange={event => field.onChange(event.target.value)}
              options={districts}
              placeholder="Район"
              error={addressErrors?.district?.message}
            />
          )}
        />
      )}
      <div>
        <TextInputField
          {...register(`addresses.${index}.fullAddress`)}
          placeholder="Повна адреса"
          error={addressErrors?.fullAddress?.message}
        />
        <p className="ml-4 mt-1 text-p4 text-gray-800">Вулиця, номер будинку, поверх, кабінет</p>
      </div>
      <TextInputField
        {...register(`addresses.${index}.nameOfClinic`)}
        placeholder="Назва клініки"
        error={addressErrors?.nameOfClinic?.message}
      />
    </div>
  );
}

AdressGroup.propTypes = {
  cities: PropTypes.array,
  index: PropTypes.number,
};
