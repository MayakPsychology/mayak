'use client';

import PropTypes from 'prop-types';
import { StepHeader } from '../../_shared';
import { FileUploadField, TextAreaField } from '../../_shared/fields';
import { SpecializationsGroup } from '../../_shared/field-groups';

const EDUCATION_HINT =
  'Коротко опишіть документи про освіту, які дають вам право надавати послуги у сфері психічного здоровʼя відповідно до законодавства України. Вкажіть усі релевантні дипломи, сертифікати чи інші підтвердження. За наявності додайте важливі спеціалізовані навчання або акредитації, що вплинули на ваш професійний розвиток.';

export function Step4({ specializations }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader
        title="Крок 4: Про себе, як фахівця/фахівчиню"
        subTitle="Загальна інформація"
        intro="У цьому підрозділі будуть питання, які стосуються специфіки та особливостей послуг, які Ви надаєте."
      />
      <TextAreaField
        name="education"
        label="Освіта"
        hints={[EDUCATION_HINT]}
        placeholder="Опис документів про освіту"
        maxLength={5000}
      />
      <FileUploadField
        name="educationFiles"
        label="Додайте документи про освіту"
        hints={['Дипломи, сертифікати або інші підтвердження. Файли надходять лише на пошту адміністрації.']}
      />
      <SpecializationsGroup specializations={specializations} />
    </fieldset>
  );
}

Step4.propTypes = {
  specializations: PropTypes.array.isRequired,
};
