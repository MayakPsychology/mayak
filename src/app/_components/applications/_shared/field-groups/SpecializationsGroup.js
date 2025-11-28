'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CheckBox } from '@/app/_components/CheckBox';
import { SpecializationMethods } from '../../SpecialistApplicationWizard/field-groups';

export function SpecializationsGroup({ specializations, specializationMethods }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [expanded, setExpanded] = useState({});
  const toggle = id => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <fieldset>
      <legend className="text-base mb-2 block font-medium">
        Виберіть Вашу спеціальність <span className="text-red-500">*</span>
      </legend>

      <Controller
        name="specializations"
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          return (
            <div>
              {specializations?.map(spec => {
                const isSelected = selected.includes(spec.id);
                return (
                  <div key={`specialization-${spec.id}`}>
                    <div className="flex items-center justify-between">
                      <CheckBox
                        type="checkbox"
                        ref={field.ref}
                        name={`specialization-${spec.id}`}
                        value={spec.id}
                        text={spec.name}
                        checked={selected.includes(spec.id) ?? false}
                        error={errors?.specializations?.message}
                        onBlur={field.onBlur}
                        onChange={e => {
                          if (e.target.checked) {
                            field.onChange([...selected, spec.id]);
                          } else {
                            field.onChange(selected.filter(id => id !== spec.id));
                          }
                        }}
                      />
                      {isSelected && (
                        <button
                          type="button"
                          onClick={() => toggle(spec.id)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          {expanded[spec.id] ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                        </button>
                      )}
                    </div>
                    {isSelected && expanded[spec.id] && (
                      <SpecializationMethods specializationId={spec.id} specializationMethods={specializationMethods} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </fieldset>
  );
}

SpecializationsGroup.propTypes = {
  specializations: PropTypes.array.isRequired,
  specializationMethods: PropTypes.array.isRequired,
};
