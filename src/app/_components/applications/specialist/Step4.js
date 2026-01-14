'use client';

import PropTypes from 'prop-types';
import { SpecializationsGroup } from '../_shared/field-groups';

export function Step4({ specializations, specializationMethods }) {
  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend className="mb-1">Крок 4: Про себе як спеціаліста/-ку</legend>
      <p className="mb-4">
        У цьому підрозділі будуть питання, які стосуються специфіки та особливостей послуг, які Ви надаєте.
      </p>
      <p className="">
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <SpecializationsGroup specializations={specializations} specializationMethods={specializationMethods} />
    </fieldset>
  );
}

Step4.propTypes = {
  specializations: PropTypes.array.isRequired,
  specializationMethods: PropTypes.array.isRequired,
};
