'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormatOfWork } from '@prisma/client';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { IoMdCloseCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { emptyAddress } from '@/app/config/application';
import { FieldHeading } from '../fields';
import { getArrayError } from '../getArrayError';
import { AdressGroup } from './AdressGroup';

export function AdressListGroup({ cities }) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'addresses', // unique name for your Field Array
  });

  const formatOfWork = useWatch({ control, name: 'formatOfWork' });
  const addresses = useWatch({ control, name: 'addresses' });
  const onlyOnline = formatOfWork === FormatOfWork.ONLINE;

  useEffect(() => {
    if (onlyOnline && addresses.length > 0) setValue('addresses', []);
    if (!onlyOnline && addresses.length === 0) setValue('addresses', [emptyAddress]);
  }, [onlyOnline, setValue, addresses.length]);

  if (!formatOfWork) {
    return (
      <div>
        <FieldHeading>Адреса / адреси, де надаються послуги</FieldHeading>
        <p className="text-p3 text-gray-800">Оберіть формат роботи</p>
      </div>
    );
  }

  if (onlyOnline) {
    return null;
  }

  return (
    <div>
      <FieldHeading>Адреса / адреси, де надаються послуги</FieldHeading>
      <ul>
        {fields.map((filed, index) => (
          <li key={filed.id} className="mb-4">
            <AdressGroup cities={cities} {...register} index={index} />
          </li>
        ))}
      </ul>
      {getArrayError(errors, 'addresses') && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
          {getArrayError(errors, 'addresses')}
        </p>
      )}
      <div className="flex gap-3">
        <button type="button" onClick={() => append(emptyAddress)}>
          <IoMdAddCircleOutline className="h-6 w-6 text-primary-500" />
        </button>
        {fields.length > 1 && (
          <button type="button" onClick={() => remove(fields.length - 1)}>
            <IoMdCloseCircleOutline className="h-6 w-6 text-system-error" />
          </button>
        )}
      </div>
    </div>
  );
}

AdressListGroup.propTypes = {
  cities: PropTypes.array,
};
