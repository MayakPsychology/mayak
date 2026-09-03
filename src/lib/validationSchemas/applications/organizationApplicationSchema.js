import { z } from 'zod';
import { FormatOfWork, OwnershipType } from '@prisma/client';
import { string, number, boolean, array } from '@/lib/validationSchemas/utils';
import {
  zClientsSchema,
  zContactsShape,
  zCreateAddressSchema,
  zSocialLinkSchema,
  zSupportFocusesField,
  zWorkDaySchema,
} from './common';

export const organizationApplicationStep1Schema = z.object({
  name: string('Назва організації').min(2).max(128).zod,
  type: array('Типи організації', string('Тип організації').zod, {
    min: 1,
    message: 'Потрібно обрати щонайменше 1 тип організації',
  }).zod,
  typeNames: z.string().array().optional(),
  ownershipType: z.enum(Object.values(OwnershipType), {
    required_error: 'Оберіть форму власності',
    invalid_type_error: 'Оберіть форму власності',
  }),
  yearsOnMarket: number('Роки на ринку').min(0).integer().zod,
  yearsOfExperience: number('Стаж').min(0).integer().zod,
  isInclusiveSpace: boolean('Інклюзивний простір').zod,
  ...zContactsShape,
  socialLink: zSocialLinkSchema,
  description: string('Опис').min(10).max(5000).zod,
});

export const organizationApplicationStep2Schema = z.object({
  formatOfWork: z.enum(Object.values(FormatOfWork), {
    required_error: 'Оберіть формат роботи',
    invalid_type_error: 'Оберіть формат роботи',
  }),
  addresses: array('Адреси', zCreateAddressSchema).zod,
  workTime: array('Графік роботи', zWorkDaySchema).zod,
});

export const organizationApplicationStep3Schema = z.object({ clients: zClientsSchema });

export const organizationApplicationStep4Schema = z.object({
  expertSpecializations: array('Спеціалізації працівників', string('Спеціалізація').zod, {
    min: 1,
    message: 'Потрібно обрати щонайменше 1 спеціалізацію',
  }).zod,
  expertSpecializationNames: z.string().array().optional(),
});

export const organizationApplicationStep5Schema = z.object({
  isFreeReception: boolean('Безкоштовний прийом').zod,
  supportFocuses: zSupportFocusesField,
});

export const organizationApplicationFullSchema = organizationApplicationStep1Schema
  .merge(organizationApplicationStep2Schema)
  .merge(organizationApplicationStep3Schema)
  .merge(organizationApplicationStep4Schema)
  .merge(organizationApplicationStep5Schema)
  .superRefine((data, ctx) => {
    if (data.formatOfWork !== FormatOfWork.ONLINE && !data.addresses.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Необхідно вказати мінімум одне місце надання послуг',
        path: ['addresses'],
      });
    }
  });
