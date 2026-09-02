'use client';

import PropTypes from 'prop-types';
import { CheckBoxListGroup } from '../../_shared/field-groups';

export function Step4({ specializations }) {
  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend className="mb-1">Крок 4: Спеціалізації працівників</legend>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <CheckBoxListGroup
        options={specializations}
        title="Спеціалізації працівників"
        name="expertSpecializations"
        labelsField="expertSpecializationNames"
      />
    </fieldset>
  );
}

Step4.propTypes = {
  specializations: PropTypes.array.isRequired,
};
