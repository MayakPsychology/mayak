import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CheckBox } from '@/app/_components/CheckBox';

export function SpecializationMethods({ specializationId, specializationMethods }) {
  const methods = specializationMethods.filter(method => specializationId === method.specializationId);

  const {
    control,
    formState: { errors },
  } = useFormContext();

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
                    if (e.target.checked) {
                      field.onChange([...selected, method.id]);
                    } else {
                      field.onChange(selected.filter(id => id !== method.id));
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

SpecializationMethods.propTypes = {
  specializationId: PropTypes.string,
  specializationMethods: PropTypes.array,
};
