'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '@/app/_components/TextArea';

export const FIELD_TEXTS = {
  // Психолог
  'd5de9719-10cd-4210-925c-184bc8369fd4': {
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
    degreeDocument: {
      label: 'Диплом психолога',
    },
    additionalDocuments: {
      label: 'Додаткові сертифікати та документи',
    },
  },

  // Психотерапевт
  '4334b2f0-5897-46e4-b214-cd5217d73886': {
    professionalDevelopment: {
      label: 'Підвищення кваліфікації з психотерапії',
    },
    personalTherapy: {
      label: 'Особиста психотерапія',
    },
    supervisionExperience: {
      label: 'Супервізійна практика',
    },
    degreeDocument: {
      label: 'Диплом та сертифікати психотерапевта',
    },
    additionalDocuments: {
      label: 'Додаткові підтверджуючі документи',
    },
  },

  // Психіатр
  'd8f4748f-9e34-4256-adef-74188a7851c1': {
    professionalDevelopment: {
      label: 'Професійний розвиток у психіатрії',
    },
    personalTherapy: {
      label: 'Особистий терапевтичний досвід (за наявності)',
    },
    supervisionExperience: {
      label: 'Клінічні супервізії',
    },
    degreeDocument: {
      label: 'Диплом лікаря-психіатра',
    },
    additionalDocuments: {
      label: 'Ліцензії та додаткові документи',
    },
  },

  // Сексолог
  '90f466ad-bdaf-4ede-94f8-355ab2cb2f1b': {
    professionalDevelopment: {
      label: 'Професійний розвиток у сексології',
    },
    personalTherapy: {
      label: 'Особистий терапевтичний досвід',
    },
    supervisionExperience: {
      label: 'Супервізії у сексологічній практиці',
    },
    degreeDocument: {
      label: 'Диплом / сертифікат сексолога',
    },
    additionalDocuments: {
      label: 'Додаткові сертифікати',
    },
  },

  // Соціальний працівник
  '15564180-30e9-4573-8777-52d04f1a999c': {
    professionalDevelopment: {
      label: 'Професійний розвиток у соціальній роботі',
    },
    personalTherapy: {
      label: 'Особистий розвиток (за наявності)',
    },
    supervisionExperience: {
      label: 'Супервізійний досвід',
    },
    degreeDocument: {
      label: 'Диплом соціального працівника',
    },
    additionalDocuments: {
      label: 'Додаткові документи',
    },
  },
};

export function SpecializationAdditionalInfo({ specialization, index }) {
  const texts = FIELD_TEXTS[specialization];
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (!texts || index == null || index < 0) return null;
  return (
    <>
      <label>{texts.professionalDevelopment.label}</label>
      <p>{texts.professionalDevelopment.description}</p>
      <Controller
        name={`specializationAdditionalInfo.${index}.professionalDevelopment`}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            placeholder="Професійний розвиток"
            error={errors?.specializationAdditionalInfo?.[index]?.professionalDevelopment?.message}
          />
        )}
      />

      <label>{texts.personalTherapy.label}</label>
      <p>{texts.personalTherapy.description}</p>
      <Controller
        name={`specializationAdditionalInfo.${index}.personalTherapy`}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            placeholder="Особиста психотерапія"
            error={errors?.specializationAdditionalInfo?.[index]?.personalTherapy?.message}
          />
        )}
      />

      <label>{texts.supervisionExperience.label}</label>
      <p>{texts.supervisionExperience.description}</p>
      <Controller
        name={`specializationAdditionalInfo.${index}.supervisionExperience`}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            placeholder="Супервізії та інтервізії"
            error={errors?.specializationAdditionalInfo?.[index]?.supervisionExperience?.message}
          />
        )}
      />

      {/* <FileUpload name="degreeDocument" label={texts.degreeDocument.label} /> */}

      {/* <FileUpload name="additionalDocuments" label={texts.additionalDocuments.label} multiple /> */}
    </>
  );
}

SpecializationAdditionalInfo.propTypes = {
  specialization: PropTypes.string,
  index: PropTypes.number,
};
