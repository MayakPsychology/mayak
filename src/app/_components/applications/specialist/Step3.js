'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { ClientsPreferences } from '../_shared/field-groups';

export function Step3({ clientCategories }) {
  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend className="mb-1">Крок 3: Специфіка Вашої роботи як спеціаліста/-ки</legend>
      <p className="mb-4">
        У цьому підрозділі будуть питання, які стосуються специфіки та особливостей послуг, які Ви надаєте.
      </p>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <ClientsPreferences clientCategories={clientCategories} />
    </fieldset>
  );
}

Step3.propTypes = {
  clientCategories: PropTypes.array.isRequired,
};
