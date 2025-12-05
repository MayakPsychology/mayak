'use-client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormatOfWork } from '@prisma/client';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { IoMdCloseCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { emptyAddress } from '@/app/config/application';
import { AdressGroup } from './AdressGroup';

export function AdressListGroup({ districts }) {
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
    return <p>Оберіть формат роботи</p>;
  }

  if (onlyOnline) {
    return null;
  }

  return (
    <>
      <ul>
        {fields.map((filed, index) => (
          <li key={filed.id} className="mb-4">
            <AdressGroup districts={districts} {...register} index={index} />
          </li>
        ))}
      </ul>
      {errors.addresses?._errors?.length > 0 && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
          {errors.addresses._errors[0]}
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
    </>
  );
}

AdressListGroup.propTypes = {
  districts: PropTypes.array,
};
