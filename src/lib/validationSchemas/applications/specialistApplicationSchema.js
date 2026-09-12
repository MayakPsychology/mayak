import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { string, number, array, regexField } from '@/lib/validationSchemas/utils';
import { PHONE_REGEX } from '@/lib/consts';
import {
  zClientsSchema,
  zContactsShape,
  zCreateAddressSchema,
  zDiscountsShape,
  zSocialLinkSchema,
  zFinalStepShape,
  zSupportFocusesField,
  zWorkDaySchema,
  zFilesField,
  refineDiscounts,
} from './common';

const zSpecializationAdditionalInfoSchema = z.object({
  specializationId: z.string().uuid(),
  specialization: string('Спеціалізація').zod,
  methodNames: z.string().array().optional(),
  methodsOther: z.string().nullish(),
  professionalDevelopment: string('Професійний розвиток').min(10).max(1000).zod,
  personalTherapy: string('Досвід').min(10).max(1000).zod,
  supervisionExperience: string('Супервізії та інтервізії').min(10).max(1000).zod,
});

export const specialistApplicationStep1Schema = z.object({
  firstName: string("Ім'я").min(2).max(64).zod,
  lastName: string('Прізвище').min(2).max(64).zod,
  surname: string('По-батькові').min(2).max(64).optional().zod,
  yearsOfExperience: number('Стаж роботи').min(0.5).halfStep().zod,
  gender: z.enum(Object.values(Gender), {
    required_error: 'Оберіть стать',
    invalid_type_error: 'Оберіть стать',
  }),
  experience: string('Досвід').min(10).max(5000).zod,
  ...zContactsShape,
  // Figma marks "Контактні дані" as required, so the phone is mandatory for specialists.
  phone: regexField('Телефон', PHONE_REGEX, 'Введіть номер телефону у міжнародному форматі', true),
  socialLink: zSocialLinkSchema,
  description: string('Опис').min(10).max(5000).zod,
});

const requireAddressWhenOffline = (data, ctx) => {
  if (data.formatOfWork !== FormatOfWork.ONLINE && !data.addresses.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Необхідно вказати мінімум одне місце надання послуг',
      path: ['addresses'],
    });
  }
};

const specialistApplicationStep2Shape = z.object({
  formatOfWork: z.enum(Object.values(FormatOfWork), {
    required_error: 'Оберіть формат роботи',
    invalid_type_error: 'Оберіть формат роботи',
  }),
  addresses: array('Адреси', zCreateAddressSchema).zod,
  workTime: array('Графік роботи', zWorkDaySchema).zod,
});

export const specialistApplicationStep2Schema = specialistApplicationStep2Shape.superRefine(requireAddressWhenOffline);

export const specialistApplicationStep3Schema = z.object({ clients: zClientsSchema });

export const specialistApplicationStep4Schema = z.object({
  education: string('Освіта').min(10).max(5000).zod,
  educationFiles: zFilesField,
  supportingFiles: zFilesField,
  specializations: array('Спеціалізації', string('Спеціалізація').zod, {
    min: 1,
    message: 'Потрібно обрати щонайменше 1 спеціалізацію',
  }).zod,
});

// Validated on the per-speciality slides that follow step 4.
export const specializationDetailsSchema = z.object({
  specializationMethods: array('Методи спеціалізації', string('Метод спеціалізації').zod).zod,
  specializationAdditionalInfo: array('Додаткова інформація', zSpecializationAdditionalInfoSchema).zod,
});

const specialistApplicationStep5Shape = z.object({
  ...zDiscountsShape,
  isFreeReception: z.boolean({
    required_error: 'Оберіть відповідь',
    invalid_type_error: 'Оберіть відповідь',
  }),
  supportFocuses: zSupportFocusesField,
});

export const specialistApplicationStep5Schema = specialistApplicationStep5Shape.superRefine(refineDiscounts);

export const finalStepSchema = z.object(zFinalStepShape);

export const specialistApplicationFullSchema = specialistApplicationStep1Schema
  .merge(specialistApplicationStep2Shape)
  .merge(specialistApplicationStep3Schema)
  .merge(specialistApplicationStep4Schema)
  .merge(specializationDetailsSchema)
  .merge(specialistApplicationStep5Shape)
  .merge(finalStepSchema)
  .superRefine(requireAddressWhenOffline)
  .superRefine(refineDiscounts);
