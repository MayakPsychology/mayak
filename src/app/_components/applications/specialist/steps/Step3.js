'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { StepHeader } from '../../_shared';
import { ClientsPreferences } from '../../_shared/field-groups';

export function Step3({ clientCategories }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader
        title="Крок 3: Специфіка Вашої роботи, як фахівця/фахівчиню"
        intro="У цьому підрозділі будуть питання, які стосуються специфіки та особливостей послуг, які Ви надаєте."
      />
      <ClientsPreferences clientCategories={clientCategories} />
    </fieldset>
  );
}

Step3.propTypes = {
  clientCategories: PropTypes.array.isRequired,
};
