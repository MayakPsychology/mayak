'use-client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '../../CheckBox';
import { SupportFocuses } from '../_shared/field-groups';

export function Step4({ therapies }) {
  const { control } = useFormContext();

  return (
    <fieldset>
      <legend>Цінова політика та типи допомоги</legend>
      <Controller
        name="isFreeReception"
        control={control}
        render={({ field }) => (
          <CheckBox
            name={field.name}
            checked={field.value ?? false}
            onChange={field.onChange}
            ref={field.ref}
            text="Безкоштовний прийом"
          />
        )}
      />
      <fieldset>
        <legend className="mb-6">Який тип допомоги можна отримати у Вас? *</legend>
        <SupportFocuses therapies={therapies} />
      </fieldset>
    </fieldset>
  );
}
Step4.propTypes = {
  therapies: PropTypes.array.isRequired,
};
