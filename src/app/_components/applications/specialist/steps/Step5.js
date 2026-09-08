'use client';

import PropTypes from 'prop-types';
import { NO_OR_OTHER_OPTIONS, YES_NO_OPTIONS } from '@/app/config/application/choices';
import { StepHeader } from '../../_shared';
import { FieldHeading, FieldHint, RadioGroupField } from '../../_shared/fields';
import { SupportFocuses } from '../../_shared/field-groups';

const INTRO = (
  <ul className="ml-4 list-disc marker:text-primary-900">
    <li>
      У цьому підрозділі ми уточнюємо інформацію щодо вартості надання послуг загалом та залежно від типу допомоги.
    </li>
    <li>
      Будь ласка, дайте відповідь на <strong>всі</strong> запитання,{' '}
      <strong>що стосуються обраних Вами типів допомоги</strong>.
    </li>
  </ul>
);

export function Step5({ therapies }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 5: Цінова політика та типи допомоги" intro={INTRO} />

      <RadioGroupField
        name="discounts"
        label="Чи надаються у Вас знижки при наявності пільг / за інших умов?"
        hints={['Якщо так - опишіть, які саме, у варіанті "Інше".']}
        options={NO_OR_OTHER_OPTIONS}
        otherField="discountsOther"
      />

      <RadioGroupField
        name="isFreeReception"
        label="Чи надаєте Ви можливість безкоштовної сесії / сесій?"
        options={YES_NO_OPTIONS}
      />

      <div>
        <FieldHeading>Які типи допомоги Ви надаєте?</FieldHeading>
        <FieldHint>Оберіть всі варіанти, які підходять для Вас.</FieldHint>
        <SupportFocuses therapies={therapies} />
      </div>
    </fieldset>
  );
}

Step5.propTypes = {
  therapies: PropTypes.array.isRequired,
};
