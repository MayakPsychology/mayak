'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { ClientsPreferences } from '../_shared/field-groups';

export function Step2({ clientCategories }) {
  return (
    <div>
      <h2 className="mb-1">2. Про специфіку Вашої роботи як спеціаліста/-ки</h2>
      <p className="mb-4">
        У цьому підрозділі будуть питання, які стосуються специфіки та особливостей послуг, які Ви надаєте.
      </p>
      <p className="mb-10">
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <ClientsPreferences clientCategories={clientCategories} />
    </div>
  );
}

Step2.propTypes = {
  clientCategories: PropTypes.array.isRequired,
};
