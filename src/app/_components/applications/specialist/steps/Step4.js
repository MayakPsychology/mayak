'use client';

import PropTypes from 'prop-types';
import { StepHeader } from '../../_shared';
import { FileUploadField, TextAreaField } from '../../_shared/fields';
import { SpecializationsGroup } from '../../_shared/field-groups';

const EDUCATION_HINT =
  'Коротко опишіть документи про освіту, які дають вам право надавати послуги у сфері психічного здоровʼя відповідно до законодавства України. Вкажіть усі релевантні дипломи, сертифікати чи інші підтвердження. За наявності додайте важливі спеціалізовані навчання або акредитації, що вплинули на ваш професійний розвиток.';

const EDUCATION_FILES_HINTS = [
  {
    key: 'education-level',
    text: (
      <>
        Тут ми просимо підтвердити саме здобуття бакалаврського, магістерського або освітньо-наукового (третього) рівня{' '}
        <strong>вищої освіти</strong>.
      </>
    ),
  },
  {
    key: 'education-all-levels',
    text: (
      <>
        Просимо за наявності прикріпляти підтверджуючі документи з <strong>усіх</strong> релевантних рівнів вищої
        освіти: якщо Ви є бакалавром <strong>та</strong> магістром психології або соціальної роботи, додайте{' '}
        <strong>обидва</strong> документи.
      </>
    ),
  },
  {
    key: 'education-not-related',
    text: (
      <>
        <strong>НЕ</strong> прикріпляйте документи зі спеціальностей, які не мають відношення до Вашої діяльності як
        спеціаліста сфери психологічних, психотерапевтичних, медичних або психосоціальних послуг.
      </>
    ),
  },
  {
    key: 'education-not-published',
    text: (
      <>
        Фото Ваших документів <strong>НЕ</strong> будуть висвітлені на сайті.
      </>
    ),
  },
];

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
        label="Надайте підтверджуючий документ про вищу освіту, який засвідчує Вашу спеціальність"
        isRequired
        hints={EDUCATION_FILES_HINTS}
      />
      <SpecializationsGroup specializations={specializations} />
    </fieldset>
  );
}

Step4.propTypes = {
  specializations: PropTypes.array.isRequired,
};
