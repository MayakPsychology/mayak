'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CheckBox } from '@/app/_components/CheckBox';
import { additionalInfoDefaultValue } from '@/app/config/application';
import { SpecializationAdditionalInfo, SpecializationMethods } from '../../specialist/field-groups';

export function SpecializationsGroup({ specializations, specializationMethods }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors?.specializations?.message;

  const { fields, append, remove } = useFieldArray({
    name: 'specializationAdditionalInfo',
    control,
  });

  const [expanded, setExpanded] = useState({});
  const toggle = id => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const getIndex = specId => fields.findIndex(field => field.specializationId === specId);
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
                const index = getIndex(spec.id);
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
                          const currentIndex = getIndex(spec.id);
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
                            if (currentIndex !== -1) {
                              remove(index);
                            }
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
                    {isSelected && expanded[spec.id] && index !== -1 && (
                      <>
                        <SpecializationMethods
                          specializationId={spec.id}
                          specializationMethods={specializationMethods}
                        />
                        <SpecializationAdditionalInfo specialization={spec.id} index={index} />{' '}
                      </>
                    )}
                  </div>
                );
              })}

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
  specializationMethods: PropTypes.array.isRequired,
};

// TODO Aditional fields to be added later:
// `professionalDevelopment`
// `personalTherapy`
// `supervisionExperience`
// `degreeDocument`
// `additionalDocuments`;
