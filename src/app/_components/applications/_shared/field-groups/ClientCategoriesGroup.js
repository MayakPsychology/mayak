import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';

export function ClientCategoriesGroup({ clientCategories, title, name, additionalName, error }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h3 className="text-base mb-2 block font-medium">
        {title || ''} <span className="text-red-500">*</span>
      </h3>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          return (
            <div>
              <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 ">
                {clientCategories?.map(category => (
                  <CheckBox
                    type="checkbox"
                    ref={field.ref}
                    key={`${name}-${category.id}`}
                    name={`${name}-${category.id}`}
                    value={category.id}
                    text={category.name}
                    checked={selected.includes(category.id) ?? false}
                    error={errors?.clientCategoryIds?.message}
                    onBlur={field.onBlur}
                    onChange={e => {
                      if (e.target.checked) {
                        field.onChange([...selected, category.id]);
                      } else {
                        field.onChange(selected.filter(id => id !== category.id));
                      }
                    }}
                  />
                ))}
              </div>
              {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
            </div>
          );
        }}
      />

      <Controller
        name={additionalName || 'additionalCategory'}
        control={control}
        render={({ field }) => (
          <TextInputField
            {...field}
            placeholder="Інші категоріїї (не зазначені у списку вище)"
            error={errors?.message?.message}
            required
            additionalContainerStyle="bg-other-white"
          />
        )}
      />
    </div>
  );
}

ClientCategoriesGroup.propTypes = {
  clientCategories: PropTypes.array.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  additionalName: PropTypes.string,
  error: PropTypes.string,
};

ClientCategoriesGroup.defaultProps = {
  title: 'Категорії клієнтів',
  name: 'clientCategoryIds',
  additionalName: 'additionalCategory',
  error: null,
};
