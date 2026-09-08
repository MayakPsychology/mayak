'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';

export function OtherOptionField({ name, label = 'Інше', placeholder = 'Вкажіть свій варіант' }) {
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
      <CheckBox type="checkbox" name={name} value="other" text={label} checked={checked} onChange={handleToggle} />
      {checked && (
        <div className="mt-2">
          {/* absolute={false}: the floating label is positioned bottom-[49px] and would land on
              the "Інше" checkbox sitting right above it. In flow it stacks instead. */}
          <TextInputField
            {...register(name)}
            placeholder={placeholder}
            absolute={false}
            additionalContainerStyle="bg-other-white"
          />
        </div>
      )}
    </div>
  );
}

OtherOptionField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
