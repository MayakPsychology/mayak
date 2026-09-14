'use client';

import PropTypes from 'prop-types';
import { NO_OR_OTHER_OPTIONS, YES_NO_OR_OTHER_OPTIONS } from '@/app/config/application/choices';
import { SECTION_NOTE, StepHeader } from '../../_shared';
import { FieldHeading, FieldHint, RadioGroupField } from '../../_shared/fields';
import { SupportFocuses } from '../../_shared/field-groups';

const INTRO = (
  <>
    <p>
      У цьому підрозділі ми уточнюємо інформацію щодо вартості надання послуг у Вашій організації загалом та залежно від
      типу допомоги.
    </p>
    <p>
      Будь ласка, дайте відповідь на <strong>всі</strong> запитання,{' '}
      <strong>що стосуються обраних Вами вище типів допомоги</strong>.
    </p>
  </>
);

export function Step4({ therapies }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 4: Цінова політика організації" intro={INTRO} note={SECTION_NOTE} />

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
        options={YES_NO_OR_OTHER_OPTIONS}
        otherField="freeReceptionOther"
      />

      <div>
        <FieldHeading>Які типи допомоги надає Ваша організація?</FieldHeading>
        <FieldHint>Оберіть всі варіанти, які підходять для Вас.</FieldHint>
        <SupportFocuses therapies={therapies} />
      </div>
    </fieldset>
  );
}

Step4.propTypes = {
  therapies: PropTypes.array.isRequired,
};
