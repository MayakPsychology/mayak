'use client';

import PropTypes from 'prop-types';
import { SpecializationsGroup } from '../_shared/field-groups';

export function Step3({ specializations, specializationMethods }) {
  return (
    <div>
      <h2 className="mb-1">Про себе як спеціаліста</h2>
      <p className="mb-4">
        У цьому підрозділі будуть питання, які стосуються специфіки та особливостей послуг, які Ви надаєте.
      </p>
      <p className="mb-10">
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <SpecializationsGroup specializations={specializations} specializationMethods={specializationMethods} />
    </div>
  );
}

Step3.propTypes = {
  specializations: PropTypes.array.isRequired,
  specializationMethods: PropTypes.array.isRequired,
};
