'use client';

import PropTypes from 'prop-types';
import { SpecializationAdditionalInfo, SpecializationMethods } from '../field-groups';

/** One slide per speciality ticked on step 4, as the mocks draw it. */
export function SpecializationDetailStep({ specialization, specializationId, index, specializationMethods }) {
  const hasMethods = specializationMethods.some(method => method.specializationId === specializationId);

  return (
    <fieldset className="flex w-full flex-col gap-10">
      <legend className="text-p1 font-bold text-primary-900">Спеціальність &quot;{specialization}&quot;</legend>
      <p className="text-p3 text-primary-900">
        Звертаємо увагу, що <strong>лише вказана Вами інформація</strong>{' '}
        {hasMethods ? 'про спеціалізацію та опис документів про освіту' : 'про освіту'} у цьому підрозділі після обробки
        адміністраторами <strong>буде висвітлена на сайті</strong>.
      </p>
      <SpecializationMethods
        specializationId={specializationId}
        specializationMethods={specializationMethods}
        index={index}
      />
      <SpecializationAdditionalInfo specializationName={specialization} index={index} />
    </fieldset>
  );
}

SpecializationDetailStep.propTypes = {
  specialization: PropTypes.string,
  specializationId: PropTypes.string,
  index: PropTypes.number.isRequired,
  specializationMethods: PropTypes.array.isRequired,
};
