'use client';

import PropTypes from 'prop-types';
import { AdressListGroup, FormatOfWorkGroup, WorkTimeGroup } from '../../_shared/field-groups';

export function Step2({ cities }) {
  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend>Крок 2: Формат роботи і адреси</legend>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <FormatOfWorkGroup />
      <AdressListGroup cities={cities} />
      <WorkTimeGroup />
    </fieldset>
  );
}

Step2.propTypes = {
  cities: PropTypes.array,
};
