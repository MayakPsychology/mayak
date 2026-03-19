import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CheckBox } from '@/app/_components/CheckBox';
import { OtherOptionField } from '@/app/_components/applications/_shared/fields';

export function SpecializationMethods({ specializationId, specializationMethods, index }) {
  const methods = specializationMethods.filter(method => specializationId === method.specializationId);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const allSelected = useWatch({ name: 'specializationMethods' }) ?? [];

  useEffect(() => {
    const names = allSelected
      .filter(id => methods.some(m => m.id === id))
      .map(id => methods.find(m => m.id === id).title);
    setValue(`specializationAdditionalInfo.${index}.methodNames`, names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSelected.join(',')]);

  const errorMessage = errors?.specializationMethods?.message;

  if (methods.length === 0) return null;

  return (
    <fieldset>
      <legend className="text-base mb-2 block font-medium">
        Виберіть Вашу спеціалізацію <span className="text-red-500">*</span>
      </legend>

      <Controller
        name="specializationMethods"
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          return (
            <div>
              {methods?.map(method => (
                <CheckBox
                  type="checkbox"
                  ref={field.ref}
                  key={`method-${method.id}`}
                  name={`method-${method.id}`}
                  value={method.id}
                  text={method.title}
                  checked={selected.includes(method.id) ?? false}
                  error={errors?.specializationMethods?.message}
                  onBlur={field.onBlur}
                  onChange={e => {
                    const newSelected = e.target.checked
                      ? [...selected, method.id]
                      : selected.filter(id => id !== method.id);
                    field.onChange(newSelected);
                  }}
                />
              ))}
            </div>
          );
        }}
      />
      <OtherOptionField name={`specializationAdditionalInfo.${index}.methodsOther`} placeholder="Інші методи (не зазначені у списку вище)" />
      {errorMessage && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{errorMessage}</p>
      )}
    </fieldset>
  );
}

SpecializationMethods.propTypes = {
  specializationId: PropTypes.string,
  specializationMethods: PropTypes.array,
  index: PropTypes.number.isRequired,
};
