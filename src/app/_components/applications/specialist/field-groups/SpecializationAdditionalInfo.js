'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '@/app/_components/TextArea';

export const DEFAULT_FIELD_TEXTS = {
  professionalDevelopment: {
    label: 'Професійний розвиток',
    description: 'Курси, вебінари, тренінги, частота участі',
  },
  personalTherapy: {
    label: 'Досвід власної терапії',
  },
  supervisionExperience: {
    label: 'Супервізії та інтервізії',
  },
};

export const FIELD_TEXTS = {
  Психолог: {
    professionalDevelopment: {
      label: 'Професійний розвиток у психології',
      description: 'Курси, вебінари, тренінги, частота участі',
    },
    personalTherapy: {
      label: 'Досвід власної психотерапії',
    },
    supervisionExperience: {
      label: 'Супервізії та інтервізії',
    },
  },
  Психотерапевт: {
    professionalDevelopment: {
      label: 'Підвищення кваліфікації з психотерапії',
    },
    personalTherapy: {
      label: 'Особиста психотерапія',
    },
    supervisionExperience: {
      label: 'Супервізійна практика',
    },
  },
  Психіатр: {
    professionalDevelopment: {
      label: 'Професійний розвиток у психіатрії',
    },
    personalTherapy: {
      label: 'Особистий терапевтичний досвід (за наявності)',
    },
    supervisionExperience: {
      label: 'Клінічні супервізії',
    },
  },
  Сексолог: {
    professionalDevelopment: {
      label: 'Професійний розвиток у сексології',
    },
    personalTherapy: {
      label: 'Особистий терапевтичний досвід',
    },
    supervisionExperience: {
      label: 'Супервізії у сексологічній практиці',
    },
  },
  'Соціальний працівник': {
    professionalDevelopment: {
      label: 'Професійний розвиток у соціальній роботі',
    },
    personalTherapy: {
      label: 'Особистий розвиток (за наявності)',
    },
    supervisionExperience: {
      label: 'Супервізійний досвід',
    },
  },
};

const FIELD_NAMES = ['professionalDevelopment', 'personalTherapy', 'supervisionExperience'];

export function getFieldTexts(specializationName) {
  const texts = FIELD_TEXTS[specializationName] ?? {};
  return FIELD_NAMES.reduce(
    (acc, field) => ({ ...acc, [field]: { ...DEFAULT_FIELD_TEXTS[field], ...texts[field] } }),
    {},
  );
}

export function SpecializationAdditionalInfo({ specializationName, index }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (index == null || index < 0) return null;

  const texts = getFieldTexts(specializationName);

  return (
    <div className="flex flex-col gap-4">
      {FIELD_NAMES.map(field => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-base block font-medium" htmlFor={`specializationAdditionalInfo.${index}.${field}`}>
            {texts[field].label} <span className="text-red-500">*</span>
          </label>
          {texts[field].description && <p className="text-p4 text-gray-700">{texts[field].description}</p>}
          <Controller
            name={`specializationAdditionalInfo.${index}.${field}`}
            control={control}
            render={({ field: controlledField }) => (
              <TextArea
                {...controlledField}
                value={controlledField.value ?? ''}
                maxLength={1000}
                placeholder={texts[field].label}
                error={errors?.specializationAdditionalInfo?.[index]?.[field]?.message}
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}

SpecializationAdditionalInfo.propTypes = {
  specializationName: PropTypes.string,
  index: PropTypes.number,
};
