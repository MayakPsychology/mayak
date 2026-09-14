'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CheckBox } from '@/app/_components/CheckBox';
import { additionalInfoDefaultValue } from '@/app/config/application';
import { FieldHeading } from '../fields';
import { getArrayError } from '../getArrayError';

const SPECIALITY_INFO =
  'Тут Ви можете описати всі свої спеціальності та зазначити актуальну інформацію для кожної у відповідних випадаючих вікнах. Будь ласка, по черзі обирайте й описуйте ті спеціальності, які бажаєте розмістити на сайті. Заповнюйте лише ті поля, що відповідають Вашому реальному професійному досвіду та освіті.';

/**
 * Step 4 only picks the specialities; each ticked one then gets its own slide
 * with the method and self-development questions, the way the mocks lay it out.
 */
export function SpecializationsGroup({ specializations }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getArrayError(errors, 'specializations');

  const { fields, append, remove } = useFieldArray({ name: 'specializationAdditionalInfo', control });

  return (
    <fieldset>
      <FieldHeading as="legend" info={SPECIALITY_INFO}>
        Виберіть Вашу спеціальність
      </FieldHeading>

      <Controller
        name="specializations"
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          return (
            <div>
              {specializations?.map(spec => (
                <CheckBox
                  key={`specialization-${spec.id}`}
                  type="checkbox"
                  ref={field.ref}
                  name={`specialization-${spec.id}`}
                  value={spec.id}
                  text={spec.name.toLocaleLowerCase('uk')}
                  checked={selected.includes(spec.id)}
                  onBlur={field.onBlur}
                  onChange={e => {
                    const currentIndex = fields.findIndex(entry => entry.specializationId === spec.id);
                    if (e.target.checked) {
                      field.onChange([...selected, spec.id]);
                      if (currentIndex === -1) {
                        append({
                          ...additionalInfoDefaultValue,
                          specializationId: spec.id,
                          specialization: spec.name,
                        });
                      }
                    } else {
                      field.onChange(selected.filter(id => id !== spec.id));
                      if (currentIndex !== -1) remove(currentIndex);
                    }
                  }}
                />
              ))}

              {errorMessage && (
                <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{errorMessage}</p>
              )}
            </div>
          );
        }}
      />
    </fieldset>
  );
}

SpecializationsGroup.propTypes = {
  specializations: PropTypes.array.isRequired,
};
