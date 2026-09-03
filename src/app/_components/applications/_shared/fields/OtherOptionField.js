'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';

export function OtherOptionField({ name, placeholder = 'Вкажіть свій варіант' }) {
  const { register, setValue, watch } = useFormContext();
  const currentValue = watch(name);
  const [checked, setChecked] = useState(!!currentValue);

  const handleToggle = e => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (!isChecked) setValue(name, '');
  };

  return (
    <div>
      <CheckBox type="checkbox" name={name} value="other" text="Інше" checked={checked} onChange={handleToggle} />
      {checked && (
        <TextInputField
          {...register(name)}
          placeholder={placeholder}
          additionalContainerStyle="bg-other-white"
        />
      )}
    </div>
  );
}

OtherOptionField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
