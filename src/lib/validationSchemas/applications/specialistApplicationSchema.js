import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { string, number, boolean, array } from '@/lib/validationSchemas/utils';
import {
  zClientsSchema,
  zContactsShape,
  zCreateAddressSchema,
  zSocialLinkSchema,
  zSupportFocusesField,
  zWorkDaySchema,
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
  ...zContactsShape,
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

export const specialistApplicationStep2Schema = specialistApplicationStep2Shape.superRefine(
  requireAddressWhenOffline,
);

export const specialistApplicationStep3Schema = z.object({ clients: zClientsSchema });

export const specialistApplicationStep4Schema = z.object({
  specializations: array('Спеціалізації', string('Спеціалізація').zod, {
    min: 1,
    message: 'Потрібно обрати щонайменше 1 спеціалізацію',
  }).zod,
  specializationMethods: array('Методи спеціалізації', string('Метод спеціалізації').zod).zod,
  specializationAdditionalInfo: array('Додаткова інформація', zSpecializationAdditionalInfoSchema).zod,
});

export const specialistApplicationStep5Schema = z.object({
  isFreeReception: boolean('Безкоштовний прийом').zod,
  supportFocuses: zSupportFocusesField,
});

export const specialistApplicationFullSchema = specialistApplicationStep1Schema
  .merge(specialistApplicationStep2Shape)
  .merge(specialistApplicationStep3Schema)
  .merge(specialistApplicationStep4Schema)
  .merge(specialistApplicationStep5Schema)
  .superRefine(requireAddressWhenOffline);
