'use client';

import PropTypes from 'prop-types';
import { TextAreaField } from '../../_shared/fields';

const PERSONAL_THERAPY_HINTS = [
  'Вкажіть орієнтовний часовий проміжок або кількість сесій власної терапії.',
  'Нас цікавить лише інформація про те, яке Ваше ставлення до проходження спеціалістами власної психотерапії, чи Ви таку відвідуєте / відвідували та орієнтовна кількість годин. Ми не потребуємо інформації про подробиці Вашого особистого життя.',
];

const SUPERVISION_HINTS = [
  'Вкажіть орієнтовний часовий проміжок або кількість сесій супервізій та інтервізій.',
  'Нас цікавить лише інформація про те, яке Ваше ставлення до проходження спеціалістами супервізій та інтервізій, чи Ви такі відвідуєте / відвідували, регулярність таких відвідувань та орієнтовна кількість годин.',
];

const PSYCHOLOGY = 'психології';

// The mocks phrase the self-development question with the field the specialist practises in.
const SELF_DEVELOPMENT_FIELD = {
  Психолог: PSYCHOLOGY,
  Психотерапевт: PSYCHOLOGY,
  Психіатр: `психіатрії та / або ${PSYCHOLOGY}`,
  Сексолог: `сексології та / або ${PSYCHOLOGY}`,
  'Соціальний працівник': `соціальної роботи та / або ${PSYCHOLOGY}`,
};

export function getFieldTexts(specializationName) {
  const area = SELF_DEVELOPMENT_FIELD[specializationName] ?? PSYCHOLOGY;
  // Only psychotherapists are asked about their own therapy unconditionally.
  const ownTherapyIsOptional = specializationName !== 'Психотерапевт';

  return {
    professionalDevelopment: {
      label:
        `Опишіть Ваш саморозвиток у царині ${area}: чи проходите Ви курси підвищення кваліфікації, ` +
        'чи відвідуєте або проводите вебінари / тренінги / курси, як часто?',
    },
    personalTherapy: {
      label:
        'Окресліть Ваш досвід проходження власної психотерапії' +
        `${ownTherapyIsOptional ? ', якщо такий наявний' : ''}`,
      hints: PERSONAL_THERAPY_HINTS,
    },
    supervisionExperience: {
      label: 'Розкажіть про Ваш досвід супервізій та інтервізій, якщо такий наявний',
      hints: SUPERVISION_HINTS,
    },
  };
}

const FIELD_NAMES = ['professionalDevelopment', 'personalTherapy', 'supervisionExperience'];

export function SpecializationAdditionalInfo({ specializationName, index }) {
  if (index == null || index < 0) return null;

  const texts = getFieldTexts(specializationName);

  return (
    <div className="flex flex-col gap-10">
      {FIELD_NAMES.map(field => (
        <TextAreaField
          key={field}
          name={`specializationAdditionalInfo.${index}.${field}`}
          label={texts[field].label}
          hints={texts[field].hints}
          placeholder="Ваша відповідь"
        />
      ))}
    </div>
  );
}

SpecializationAdditionalInfo.propTypes = {
  specializationName: PropTypes.string,
  index: PropTypes.number,
};
