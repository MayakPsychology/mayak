'use-client';

import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IoMdCloseCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { AdressGroup } from './AdressGroup';

export function AdressListGroup({ districts }) {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'addresses', // unique name for your Field Array
  });
  return (
    <ul>
      {fields.map((filed, index) => (
        <li key={filed.id} className="mb-4">
          <AdressGroup districts={districts} {...register} index={index} />
        </li>
      ))}
      <div className="flex gap-3">
        <button type="button" onClick={() => append()}>
          <IoMdAddCircleOutline className="h-6 w-6 text-primary-500" />
        </button>
        <button type="button" onClick={() => remove(fields.length - 1)}>
          <IoMdCloseCircleOutline className="h-6 w-6 text-system-error" />
        </button>
      </div>
    </ul>
  );
}

AdressListGroup.propTypes = {
  districts: PropTypes.array,
};
