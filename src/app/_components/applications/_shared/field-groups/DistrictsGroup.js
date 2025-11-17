'use-client';

import React from 'react';
import ky from 'ky';
import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';

export function DistrictsGroup() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // districts choices list
  const { data: districtsChoicesList } = useQuery({
    queryKey: ['districtsChoicesList'],
    queryFn: () => ky.get('/api/district').json(),
  });

  return (
    <fieldset>
      <legend className="text-base mb-2 block font-medium">
        Район <span className="text-red-500">*</span>
      </legend>

      <Controller
        name="districtIds"
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          return (
            <div>
              {districtsChoicesList?.map(district => (
                <CheckBox
                  ref={field.ref}
                  type="checkbox"
                  key={district.id}
                  value={district.id}
                  text={district.name}
                  checked={selected.includes(district.id) ?? false}
                  error={errors?.districtIds?.message}
                  onBlur={field.onBlur}
                  onChange={e => {
                    if (e.target.checked) {
                      field.onChange([...selected, district.id]);
                    } else {
                      field.onChange(selected.filter(id => id !== district.id));
                    }
                  }}
                />
              ))}
            </div>
          );
        }}
      />
    </fieldset>
  );
}
