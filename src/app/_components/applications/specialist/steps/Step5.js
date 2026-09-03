'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { SupportFocuses } from '../../_shared/field-groups';

export function Step5({ therapies }) {
  const { control } = useFormContext();

  return (
    <fieldset className="flex w-full flex-col gap-10">
      <legend>Крок 5: Цінова політика та типи допомоги</legend>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
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
        <legend className="mb-6">
          Який тип допомоги можна отримати у Вас? <span className="text-red-500">*</span>
        </legend>
        <SupportFocuses therapies={therapies} />
      </fieldset>
    </fieldset>
  );
}

Step5.propTypes = {
  therapies: PropTypes.array.isRequired,
};
