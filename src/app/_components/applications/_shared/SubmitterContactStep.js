'use client';

import { TextAreaField } from './fields';

/** Closing slide of every application flow — who filled the form in, for follow-up questions only. */
export function SubmitterContactStep() {
  return (
    <fieldset className="flex w-full flex-col gap-6">
      <legend className="text-p1 font-bold text-primary-900">Контактні дані особи, яка заповнює форму</legend>
      <div className="text-p3 text-primary-900">
        <p>Будь ласка, вкажіть, хто саме заповнює форму:</p>
        <ul className="ml-4 list-disc marker:text-primary-900">
          <li>ПІБ;</li>
          <li>Посада в організації;</li>
          <li>Ваша електронна адреса та/або номер телефону.</li>
        </ul>
      </div>
      <p className="text-p3 font-bold text-primary-900">
        Інформація з цього запитання не буде висвітлена на сайті та використовуватиметься виключно в цілях потенційного
        уточнення інформації.
      </p>
      <TextAreaField name="submitterContact" placeholder="Ваша відповідь" maxLength={500} />
    </fieldset>
  );
}
