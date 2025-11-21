import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextArea } from '@/app/_components/TextArea';

export function ClientCategoriesGroup({ title, name, additionalName, error }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // client categories choices list
  const { data: clientCategories } = useQuery({
    queryKey: ['clientCategories'],
    queryFn: () => ky.get('/api/client-categories').json(),
  });

  return (
    <>
      <fieldset>
        <legend className="text-base mb-2 block font-medium">
          {title || ''} <span className="text-red-500">*</span>
        </legend>

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const selected = field.value || [];
            return (
              <div>
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
                {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
              </div>
            );
          }}
        />

        <Controller
          name={additionalName || 'additionalCategory'}
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              maxLength={320}
              placeholder="Ваша відповідь"
              required
              error={errors?.message?.message}
            />
          )}
        />
      </fieldset>
    </>
  );
}

ClientCategoriesGroup.propTypes = {
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
