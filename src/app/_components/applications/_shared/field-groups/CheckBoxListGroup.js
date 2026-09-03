'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { OtherOptionField } from '../fields';
import { getArrayError } from '../getArrayError';

export function CheckBoxListGroup({ options, title, name, labelsField, otherField, otherPlaceholder, columns }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getArrayError(errors, name);

  return (
    <div>
      <h3 className="text-base mb-2 block font-medium">
        {title} <span className="text-red-500">*</span>
      </h3>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          return (
            <div>
              <div className={columns}>
                {options?.map(option => (
                  <CheckBox
                    type="checkbox"
                    ref={field.ref}
                    key={`${name}-${option.id}`}
                    name={`${name}-${option.id}`}
                    value={option.id}
                    text={option.name ?? option.title}
                    checked={selected.includes(option.id)}
                    onBlur={field.onBlur}
                    onChange={e => {
                      const newSelected = e.target.checked
                        ? [...selected, option.id]
                        : selected.filter(id => id !== option.id);
                      field.onChange(newSelected);
                      if (labelsField) {
                        setValue(
                          labelsField,
                          newSelected
                            .map(id => options.find(item => item.id === id))
                            .map(item => item?.name ?? item?.title)
                            .filter(Boolean),
                        );
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />

      {otherField && <OtherOptionField name={otherField} placeholder={otherPlaceholder} />}

      {errorMessage && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{errorMessage}</p>
      )}
    </div>
  );
}

CheckBoxListGroup.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelsField: PropTypes.string,
  otherField: PropTypes.string,
  otherPlaceholder: PropTypes.string,
  columns: PropTypes.string,
};

CheckBoxListGroup.defaultProps = {
  columns: 'mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3',
  otherPlaceholder: 'Вкажіть свій варіант',
};
